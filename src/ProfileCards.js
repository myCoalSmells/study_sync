import { collection, doc, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card';
import PCMod from "./ProfileCards.module.css";
import SwipeButtons from "./SwipeButtons";

function ProfileCards() {

  // const [students, setStudents] = useState([
  //   {
  //     name: 'Michael Liu',
  //     pfp: "https://i.imgur.com/pkpvLJn.jpeg",
  //     classMatch: "",
  //     availTime: "",
  //     contactInfo: ""  
  //   },
  //   {
  //     name: 'Bob Lee',
  //     pfp: "https://i.imgur.com/ZAcA6w9.jpeg",
  //     classMatch: "",
  //     availTime: "",
  //     contactInfo: ""
  //   },
  //   {
  //     name: 'Michael Jordan',
  //     pfp: "https://i.imgur.com/ZAcA6w9.jpeg",
  //     classMatch: "",
  //     availTime: "",
  //     contactInfo: ""
  //   },
  //   {
  //     name: 'Barack Obama',
  //     pfp: "https://i.imgur.com/ZAcA6w9.jpeg",
  //     classMatch: "",
  //     availTime: "",
  //     contactInfo: ""
  //   },

  // ]);
  const [students, setStudents] = useState([]);

  useEffect(() => { 
    const q = query(collection(db, "students"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setStudents(querySnapshot.docs.map(doc => doc.data()));
    });

    // Unsubscribe from listener when component unmounts
    return unsub;
  }, []);

  return (
    <div>
      <h1>Student Cards poo</h1>
      <div className={PCMod.studentCards__container}>
        {students.map(student => (
          <TinderCard
            className={PCMod.swipe}
            key={student.name}
            preventSwipe={['up', 'down']}
          >
            <div style={{ backgroundImage: `url(${student.pfp})` }} className={PCMod.card}>
              <h1>{student.name}</h1>
            </div>
          </TinderCard>
        ))}
      </div>
      <SwipeButtons />
    </div>
  );
}

export default ProfileCards;
