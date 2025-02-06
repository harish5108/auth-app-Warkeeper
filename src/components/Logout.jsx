import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Logout(){
  const navigate = useNavigate(); 
  function onLogout(){
    navigate('/');
  }
  
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onLogout} startIcon={<LogoutIcon />} sx={{ marginLeft: 'auto' }} variant="contained" >
          Logout
        </Button>
        </div>
      );
}
export default Logout;