import { collection, doc, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card';
import PCMod from "./ProfileCards.module.css";
import SwipeButtons from "./SwipeButtons";

function ProfileCards() {

  const [students, setStudents] = useState([]);

  useEffect(() => { 
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
              <h1>{student.username}</h1>
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
