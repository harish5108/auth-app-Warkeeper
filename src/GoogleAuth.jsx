import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import AppWarkeeper from './components/AppWarkeeper';
// require('dotenv').config();

function GoogleAuth() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false); // Track authentication status
  const navigate = useNavigate();  // Initialize the navigate function

  const responseGoogle = (response) => {
    setIsLoading(true);
    if (response.credential) {
      fetch('http://localhost:5000/auth/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          console.log('User authenticated:', data);
          setIsAuthenticated(true); // Set authentication status to true after successful login
          navigate('/warrior');
        })
        .catch((err) => {
          setIsLoading(false);
          console.error('Error:', err);
          alert('Authentication failed');
        });
    }
  };

  return (
    <GoogleOAuthProvider clientId="your_google_client_id.apps.googleusercontent.com">
      <div>
        {isLoading && <p>Loading...</p>}

        {!isAuthenticated ? (
          // If not authenticated, show Google Login button
          //process.env.REACT_APP_GOOGLE_CLIENT_ID
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={(error) => {
              console.error('Login Failed:', error);
              alert('Login failed. Please try again.');
            }}
          />
        ) : (
          // If authenticated, show AppWarkeeper component
          <AppWarkeeper />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;
