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
            <div style={{ backgroundImage: `url(${student.pfp})` }} className={PCMod.card}>
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