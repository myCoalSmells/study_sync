import React from 'react';
import './Header.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </head>
      <IconButton onClick={() => navigate('/profile')}>
        <AccountCircleIcon className="header__icon" fontSize="large" />
      </IconButton>
      <Link to="/">
        <img
          className="header__logo"
          src="https://i.imgur.com/FdQfJuY.png"
          alt="logo"
          onClick={() => navigate('/')}
        />
      </Link>
      <IconButton onClick={() => navigate('/chat')}>
        <ChatIcon className="header__icon" fontSize="large" />
      </IconButton>
    </div>
  );
}

export default Header;



