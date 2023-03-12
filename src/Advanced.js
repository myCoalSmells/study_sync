import { collection, doc, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import React, { useEffect, useState, useMemo, useRef } from "react";
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

  const swipeableCardsRefs = useMemo(() => (
    students.reduce((acc, curr) => {
      acc[curr.username] = React.createRef();
      return acc;
    }, {})
  ), [students]);

  const swipeLeft = (username) => {
    if (swipeableCardsRefs[username].current) {
      console.log(`Swipe left for ${username}`);
      swipeableCardsRefs[username].current.swipe('left');
    }
  };

  const swipeRight = (username) => {
    if (swipeableCardsRefs[username].current) {
      console.log(`Swipe right for ${username}`);
      swipeableCardsRefs[username].current.swipe('right');
    }
  };

  return (
    <div className={PCMod.cardContainer}>
      <h1>Your Study Syncs!</h1>
      <div className={PCMod.studentCards__container}>
        {students.map(student => (
          <TinderCard
            ref={swipeableCardsRefs[student.username]} 
            onSwipe={(direction) => onSwipe(direction)}
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
      <div className={PCMod.button__Container}>
        {students.map(student => (
          <div key={student.username}>
            <button onClick={() => swipeLeft(student.username)}>Swipe Left</button>
            <button onClick={() => swipeRight(student.username)}>Swipe Right</button>
          </div>
        ))}
      </div>
      <SwipeButtons />
      <h1>No more syncs 😿</h1>
    </div>
  );
}

export default ProfileCards;