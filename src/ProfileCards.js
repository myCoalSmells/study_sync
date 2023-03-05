//import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import TinderCard from 'react-tinder-card';
import PCMod from "./ProfileCards.module.css";

function ProfileCards() {
  const [students, setStudents] = useState([
    {
      name: 'Michael Liu',
      pfp: "https://i.imgur.com/pkpvLJn.jpeg",
      classMatch: "",
      availTime: "",
      contactInfo: ""  
    },
    {
      name: 'Bob Lee',
      pfp: "https://i.imgur.com/ZAcA6w9.jpeg",
      classMatch: "",
      availTime: "",
      contactInfo: ""
    },
    {
      name: 'Michael Jordan',
      pfp: "https://i.imgur.com/ZAcA6w9.jpeg",
      classMatch: "",
      availTime: "",
      contactInfo: ""
    },
    {
      name: 'Barack Obama',
      pfp: "https://i.imgur.com/ZAcA6w9.jpeg",
      classMatch: "",
      availTime: "",
      contactInfo: ""
    },

  ]);

  return (
    <div>
      <h1>Student Cards</h1>
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

    </div>

  );
}

export default ProfileCards;
