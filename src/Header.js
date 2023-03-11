import React from 'react'
import "./Header.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import AcUnitIcon from '@mui/icons-material/AcUnit';



function Header() {
  return (
    <div className="header">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </head>
      <IconButton>
        <AccountCircleIcon className="header__icon" fontSize="large" />
      </IconButton>
      <img
        className="header__logo"
        src="https://i.imgur.com/FdQfJuY.png"
        alt="logo"
      />
      <IconButton>
        <ChatIcon className="header__icon" fontSize="large" />
      </IconButton>
    </div>
  );
  
}

export default Header;