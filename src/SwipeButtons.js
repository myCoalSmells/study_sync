import React from 'react';
import "./SwipeButtons.css";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import TinderCard from 'react-tinder-card'

function SwipeButtons() {
    return (
      <div className="swipeButtons">
          <IconButton>
              <HeartBrokenIcon fontSize="large" className="swipeButtons__skip"/>
          </IconButton>
          <IconButton>
              <FavoriteIcon fontSize='large' className="swipeButtons__match"/>
          </IconButton>
      </div>
    )
  }
  
  export default SwipeButtons;
  