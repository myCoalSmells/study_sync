import React from 'react';
import './Header.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  const navigate = useNavigate();

  return (
    <div style={{backgroundImage: 'url("https://i.imgur.com/PpZlIRy.jpeg")'}}>
    <div className="header">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </head>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton onClick={() => navigate('/profile')}>
          <AccountCircleIcon className="header__icon" fontSize="large" />
        </IconButton>
        <IconButton onClick={() => navigate('/inbox')}>
          <EmailIcon className="header__icon" fontSize="large" />
        </IconButton>
      </div>
      <Link to="/">
        <img
          className="header__logo"
          src="https://i.imgur.com/IJaSEqJ.png"
          alt="logo"
          onClick={() => navigate('/')}
        />
      </Link>
      <IconButton onClick={() => navigate('/logout')}>
          <LogoutIcon className="header__icon" fontSize="large" />
        </IconButton>
    </div>
    </div>
  );
}

export default Header;
