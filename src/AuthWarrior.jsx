import React from 'react';
import Navigation from './Navigation';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import GoogleAuth from './GoogleAuth';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(6),
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

function AuthWarrior() {
    return(<Card variant="outlined" >
        <h1>Authentication Warrior</h1>
        <CardContent>Authentication is the process of verifying the identity of a user, system. It's like checking an ID to make sure someone is who they say they are.</CardContent>
        <Button type="submit" fullWidth variant="contained" > <Navigation /></Button>
        <GoogleAuth />
        </Card>);
}

export default AuthWarrior;