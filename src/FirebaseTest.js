import React, { useState } from 'react';
import { app, db } from "./firebase_setup/firebase";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

import "./FirebaseTest.css";

function FirebaseTest () {
  const [data, setData] = useState({});
  const collectionRef = collection(db, "students");

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setData({ ...data, ...newInput })
  }

  const handleSubmit = () => {
    addDoc(collectionRef, {
      name: data.name,
      contactInfo: data.contactInfo
    })
  }

  return (
      <div>
        <input
          placeholder="Name"
          name="name"
          type="name"
          onChange={event => handleInput(event)}
        />
        <input
          placeholder="Contact Info"
          name="contactInfo"
          type="contactInfo"
          onChange={event => handleInput(event)}
        />

        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
}

export default FirebaseTest;