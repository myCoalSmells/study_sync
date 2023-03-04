//import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import TinderCard from 'react-tinder-card';
import "./ProfileCards.css";

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
      name: 'Harry Hinman',
      pfp: "https://i.imgur.com/ZAcA6w9.jpeg",
      classMatch: "",
      availTime: "",
      contactInfo: ""
    }
  ]);

  return (
    <div>
      <h1>Student Cards</h1>
      <div className="studentCards__container">
        {students.map(student => (
            <TinderCard
            className="swipe"
            key={student.name}
            preventSwipe={['up', 'down']}
            >
            <div style={{ backgroundImage: `url(${student.pfp})` }} className="card">
                <h1>{student.name}</h1>
            </div>
            </TinderCard>
        ))}
        </div>

    </div>

  );
}

export default ProfileCards;
