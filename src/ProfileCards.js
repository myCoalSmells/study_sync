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
          .filter(student => student.classes && student.classes.some(c => classes.includes(c))) // Check if classes array exists before calling .some()
          .filter(student => !likes.includes(student.key)) // Filter out liked students
          .filter(student => !dislikes.includes(student.key)) // Filter out disliked students
          .filter(student => !matches.includes(student.key)); // Filter out matched students
        setStudents(filteredStudents);
      });
      return unsub;
    }
  }, [username, login, classes, likes, dislikes, matches]);

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
      if (student.likes.includes(auth.currentUser.uid)) { //if both like each other, match
        console.log("matched!");
        const otherStudentDocRef = doc(firestore, "students", student.key);
        const otherStudentDoc = await getDoc(otherStudentDocRef);
        const otherStudentMatches = otherStudentDoc.get("matches") || [];
        const updatedMatches = [...matches, student.key];
        await setDoc(userDocRef, { matches: updatedMatches }, { merge: true });
        await setDoc(otherStudentDocRef, { matches: [...otherStudentMatches, auth.currentUser.uid] }, { merge: true });
        setMatches(updatedMatches);
      }
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

  const getSharedClasses = (student) => {
    const studentClasses = student.classes || [];
    const sharedClasses = studentClasses.filter(c => classes.includes(c));
    return sharedClasses;
  }

  function countMatchingHours (str1, str2) {
    let count = 0;
    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
      if (str1[i] === str2[i]) {
        count++;
      }
    }
  
    return count;
  }
  
  return (
    <div className={PCMod.cardContainer}>
      <p>Your Study Syncs! 🥳</p>
      <div className={PCMod.studentCards__container}>
      {students.length === 0 ? (
        <p>Just kidding, it is empty here 🧸</p>
      ) : (
        students.map(student => (
          <TinderCard
            onSwipe={(direction) => onSwipe(direction, student)}
            className={PCMod.swipe}
            key={student.username}
            preventSwipe={['up', 'down']}
          >
            <div style={{ backgroundImage: `url(${getProfilePic(student)})` }} className={PCMod.card}>
              <h1 className={PCMod.classes}>{student.username}</h1>
              {/* <p className={PCMod.classes}>Classes: {getClasses(student).join(", ")}</p> */}
              <p className={PCMod.sharedClasses}>Shared Classes: {getSharedClasses(student).join(", ")}</p>
              <p className={PCMod.sharedClasses}>{countMatchingHours(availTime, student.availTime)} Shared Hours</p>
            </div>
          </TinderCard>
        ))
      )}
      </div>
      <p className={PCMod.footer}>swipe 👈 to dislike, swipe 👉 to like!</p>
    </div>
  );
  
  }
  
  


export default ProfileCards;