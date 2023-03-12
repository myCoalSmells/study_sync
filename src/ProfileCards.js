import { collection, doc, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card';
import PCMod from "./ProfileCards.module.css";
import SwipeButtons from "./SwipeButtons";
import {auth} from "./firebase-setup/firebase";
import { useNavigate } from 'react-router-dom';

function ProfileCards() {
  const Nav = useNavigate();
  const user = auth.currentUser;

  const [students, setStudents] = useState([]);
  useEffect(() => { 
    if (user){
      console.log("logged in");
    }
    else{
      console.log("not logged in");
      Nav('/login')
    }
    const q = query(collection(db, "students"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setStudents(querySnapshot.docs.map(doc => doc.data()));
    });

    // Unsubscribe from listener when component unmounts
    return unsub;
  }, []);

  const onSwipe = (direction) => { //put matches and stuff edit firebase
    console.log('You swiped: ' + direction)
  }

  const getProfilePic = (student) => {
    if (student.pfp) {
      return student.pfp;
    } else {
      return "https://i.pinimg.com/originals/1a/68/f7/1a68f758cd8b75d47e480722c3ad6791.png";
    }
  }

  const getClasses = (student) => {
    return student.classes || [];
  }
  
  return (
    <div className={PCMod.cardContainer}>
      <h1>Your Study Syncs!</h1>
      <div className={PCMod.studentCards__container}>
        {students.map(student => (
          <TinderCard
            onSwipe={onSwipe}
            className={PCMod.swipe}
            key={student.username}
            preventSwipe={['up', 'down']}
          >
            <div style={{ backgroundImage: `url(${getProfilePic(student)})` }} className={PCMod.card}>
              <h1 className={PCMod.classes}>{student.username}</h1>
              <p className={PCMod.classes}>Classes: {getClasses(student).join(", ")}</p>
            </div>
          </TinderCard>
        ))}
      </div>
      <SwipeButtons />
      <h1>No more syncs 😿</h1>
    </div>
  );
  
  }
  
  


export default ProfileCards;