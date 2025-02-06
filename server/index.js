const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const passport = require('passport');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('dotenv').config();

const app = express();
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const allowedOrigins = ['http://localhost:3000', 'https://your-production-url.com'];  // Dynamic origin handling
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    console.log('CORS request from unallowed origin:', origin); // Debugging
    callback(new Error('Not allowed by CORS'), false);
  }
}));

app.use(express.json()); // To parse incoming JSON requests
// const callbackURL = process.env.NODE_ENV === 'production'
//   ? 'https://your-production-url.com/auth/google/callback'
//   : 'http://localhost:5000/auth/google/callback';

// Set up Passport.js to handle Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback', // The callback URL that Google will redirect to
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const result = await pool.query('SELECT * FROM googleusers WHERE google_id = $1', [profile.id]);
    if (result.rows.length > 0) {
      return done(null, result.rows[0]);
    } else {
      const newUser = await pool.query(
        'INSERT INTO googleusers (google_id, email, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
        [profile.id, profile.emails[0].value, profile.name.givenName, profile.name.familyName]
      );
      return done(null, newUser.rows[0]);
    }
  } catch (error) {
    console.error(error);
    return done(error, null);
  }
}));

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  httpOnly: true, // Helps prevent client-side access
  secure: process.env.NODE_ENV === 'production' // Ensure cookies are only sent over HTTPS in production
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM googleusers WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (error) {
    done(error, null);
  }
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/warrior');
  }
);

app.post('/auth/google/callback', async (req, res) => {
  const { token } = req.body; // Get the token from frontend
  
  try {
    // Verify the token and extract user info
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    // Proceed with your logic (e.g., find or create user in DB)
    res.json({ message: 'User authenticated successfully', user: payload });
    // res.redirect('/warrior');
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
});


app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user); // Return the authenticated user's details
  } else if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      // Fetch user from DB based on decoded userId
      pool.query('SELECT * FROM atusers WHERE id = $1', [decoded.userId], (err, result) => {
        if (err || result.rows.length === 0) {
          return res.status(401).json({ message: 'User not found' });
        }
        res.json(result.rows[0]); // Return the user info
      });
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});


app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Logout error' });
    res.clearCookie('session'); // Clear cookie if using cookie-session
    res.redirect('/'); // Redirect after logout
  });
});

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    const checkUser = await pool.query('SELECT * FROM atusers WHERE email = $1', [email]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO atusers (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    const user = await pool.query('SELECT * FROM atusers WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
