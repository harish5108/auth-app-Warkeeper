import React, { useState } from 'react';
import axios from 'axios';
import AppWarkeeper from './components/AppWarkeeper';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import Navigation from './Navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(false);
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      console.log('Login successful:', response.data);
      setIsAuthenticated(true);
      navigate('/warrior');
      // Handle the token, e.g., store it in localStorage or state
    } catch (error) {
      setIsLoading(false);
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <div {...props}>
      <CssBaseline enableColorScheme />
      <div sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
      {isLoading && <p>Loading...</p>}
      <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Login
          </Typography>
          {!isAuthenticated ? (
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                autoComplete="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                placeholder="your@email.com"
              />
            </FormControl>
      
       
        <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                variant="outlined"
              />
            </FormControl>
       
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
        
        <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={validateInputs}
            >
              Login
            </Button>
        
        </Box>
      ) : (
         // If authenticated, show AppWarkeeper component
         <AppWarkeeper />
        )}
        <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        
            <GoogleAuth />
            <Typography sx={{ textAlign: 'center' }}>
              Already (or) Don't have an account?{' '}
              <Link
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                <Navigation />
              </Link>
            </Typography>
          </Box>
        
        {/* <Navigation /> */}
        {/* <GoogleAuth /> */}
        </Card>
        </SignUpContainer>
        </div>
    </div>
  );
}

export default Login;
