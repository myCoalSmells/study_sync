import React, { useEffect, useState } from 'react';
import './Header.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth, firestore } from "./firebase-setup/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, get, getDoc } from "firebase/firestore";

function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  onAuthStateChanged(auth, async (user) => {
      if (user) {
          const docRef = doc(firestore, "students", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              setUsername(docSnap.get("username"));
          } else {
              console.log("Document could not be found.");
          }
      } else {
              console.log("No one is logged in.");
      }
      
  })

  return (
    <div className="background">
      <div className="header">
        <head>
          <link 
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </head>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div className="hello">{username ? <p>Hello, {username}! 👋</p> : null}</div>
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
