import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <Link to="/login">Login</Link>&nbsp;
      <Link to="/register">Register</Link>
    </nav>
  );
}



