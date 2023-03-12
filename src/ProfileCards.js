import { collection, doc, query, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card';
import PCMod from "./ProfileCards.module.css";
import SwipeButtons from "./SwipeButtons";
import { auth, firestore } from "./firebase-setup/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


function ProfileCards() {
  const Nav = useNavigate();
  const auth = getAuth();
  const [username, setUsername] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [availTime, setAvailTime] = useState("");
  const [login, setLogin] = useState(false);
  const [classes, setClasses] = useState("");
  const [matches, setMatches] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(firestore, "students", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUsername(docSnap.get("username"));
          setMatches(docSnap.get("matches") || []);
          setClasses(docSnap.get("classes") || []);
          setLikes(docSnap.get("likes") || []);
          setDislikes(docSnap.get("dislikes") || []);
          setContactInfo(docSnap.get("email"));
          setAvailTime(docSnap.get("availTime") || []);
          setLogin(true);
        } else {
          console.log("Document could not be found.");
        }
      } else {
        console.log("No one is logged in.");
        setLogin(false); // set login state to false when user is not logged in
        Nav('/login')
      }
    });
  }, [auth, Nav]);

  useEffect(() => { 
    if (login){
      console.log("logged in");
      const q = query(collection(db, "students"));
      const unsub = onSnapshot(q, (querySnapshot) => {
        const filteredStudents = querySnapshot.docs.map(doc => doc.data())
          .filter(student => student.username !== username) // Filter out your own card
          .filter(student => student.classes.some(c => classes.includes(c))); // Filter by common classes
        setStudents(filteredStudents);
      });
      return unsub;
    }
  }, [username, login, classes]);

  const onSwipe = async (direction, student) => {
    console.log(`You swiped ${direction} on ${student.username}`);
  
    const userDocRef = doc(firestore, "students", auth.currentUser.uid);
    if (direction === "left") {
      // Add student to dislikes list
      const updatedDislikes = [...dislikes, student.key];
      await setDoc(userDocRef, { dislikes: updatedDislikes }, { merge: true });
      setDislikes(updatedDislikes);
    } else if (direction === "right") {
      // Add student to likes list
      const updatedLikes = [...likes, student.key];
      await setDoc(userDocRef, { likes: updatedLikes }, { merge: true });
      setLikes(updatedLikes);
    }
  };
  

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
            onSwipe={(direction) => onSwipe(direction, student)}
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