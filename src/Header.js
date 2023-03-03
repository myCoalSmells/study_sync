import React from 'react'
import "./Header.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';


function Header() {
  return (
    <div className = "header"> 
        <IconButton>
            <AccountCircleIcon className="headericon" fontSize="large"/>
        </IconButton>
        <img 
            className="headerlogo"
            src="https://i.imgur.com/FdQfJuY.png" alt = "logo"
        />
        <IconButton>
           <ChatIcon className="header__icon" fontSize="large"/>
        </IconButton>
    </div>
  )
}

export default Header;