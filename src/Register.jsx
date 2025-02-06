import React, { useState } from 'react';
import axios from 'axios';
import AppWarkeeper from './components/AppWarkeeper';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import Navigation from './Navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
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
    padding: theme.spacing(1),
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

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(false);
      const response = await axios.post('http://localhost:5000/api/register', { email, password });
      setIsAuthenticated(true);
      navigate('/warrior');
      console.log('Registration successful:', response.data);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message || 'An error occurred');
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
            Register
          </Typography>
      {!isAuthenticated ? (
        <Box
        component="form"
        onSubmit={handleRegister}
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
            <FormControl>
              <FormLabel htmlFor="confirmpassword">Confirm Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                variant="outlined"
              />
            </FormControl>
   
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Register
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
        {/* <Navigation />
        <GoogleAuth /> */}
        </Card>
        </SignUpContainer>
        </div>
    </div>
  );
}

export default Register;
