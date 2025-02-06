import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

import AppWarkeeper from './components/AppWarkeeper';
import AuthWarrior from './AuthWarrior';


function App() {
  return (
    <Router>
      <div>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/" element={<><AuthWarrior /></>} />
        <Route path="/warrior" element={<AppWarkeeper />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
