import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { db } from "./firebase";
import Button from 'react-bootstrap/Button';
import IMod from "./Inbox.module.css";
 import { auth, firestore } from "./firebase-setup/firebase";
 import { getAuth, onAuthStateChanged } from "firebase/auth";
 import { get, getDoc } from "firebase/firestore";
 import { collection, doc, query, onSnapshot, setDoc } from "firebase/firestore";
 import { useNavigate } from 'react-router-dom';

  
function Inbox() {
  const Nav = useNavigate();
  const auth = getAuth();
  const [username, setUsername] = useState("");
  const [students, setStudents] = useState([]);
  const [inboxMatches, setInboxMatches] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [matches, setMatches] = useState([])
  const [login, setLogin] = useState(false);
  const [classes, setClasses] = useState([]);
  const [newNum, setNewNum] = useState(0);
  let user = "";

  const handleMarkAllAsRead = () => {
    setNewNum(0); // set new message count to zero
  }

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
  });


  const getDislikes = (student) => {
    return student.dislikes || [];
  }

  const getClasses = (student) => {
    return student.classes || [];
  }

  const getMatches = (student) => {
    return student.matches || [];
  }

  const getInboxMatches = (student) => {
    var isMatch = true;
    if (student.username === username)
        user = student;
    for (let student1 in students) {
        if (student.username === student1.username)
            break;
        for (let i = 0; i < getDislikes(student1).length; i++) {
            if (getDislikes(student1)[i] === student.username) {
                isMatch = false;
                break;
            }
        }
        if (isMatch === false)
            break;
        for (let j = 0; j < getDislikes(student).length; j++) {
            if (getDislikes(student)[j] === student1.username) {
                isMatch = false;
                break;
            }
        }
        if (isMatch === false)
            break;
        for (let k = 0; k < getMatches(student).length; k++) {
            if (getMatches(student)[k] === student1.username){
                if (!inboxMatches.some(m => m.username === student.username)) {
                  // Add message to inboxMatches if it hasn't been read yet
                  setInboxMatches(inboxMatches => [...inboxMatches, student]);
                  setNewNum(newNum => newNum + 1); // Increment new message count
                }
                break;
              }
        }
    }
    return inboxMatches;
  }

    if (newNum == 0){
        return (
            <div className={IMod.inbox}>
                <h1>INBOX</h1>
                <div className={IMod.container}>
                    <h1>({newNum} new)</h1>
                </div>
                <Button onClick={handleMarkAllAsRead}>Mark All As Read</Button>
            </div>
        );
    }
    else {
        return (
            <div className={IMod.inbox}>
                <h1>INBOX</h1>
                <div className={IMod.container}>
                    <h1>({newNum} new)</h1>
                </div>
                <Button onClick={handleMarkAllAsRead}>Mark All As Read</Button>
            <div className={IMod.inbox}>
            {getInboxMatches(user).map(inboxMatch => (
              <Card stype={{width: '20rem'}}>
              <Card.Body>
              <Card.Title>{inboxMatch.username}</Card.Title>
              <Card.Subtitle>Email: {inboxMatch.email}</Card.Subtitle>
              <img src={inboxMatch.pfp} width={300} height={300}/>
              <Card.Text>Classes:</Card.Text>
              <Card.Text>{getClasses(inboxMatch).join(", ")}</Card.Text>
              <Button>View Profile</Button>
              </Card.Body>
            </Card>        
            ))}
            </div>
            </div>
        );
    }
}

export default Inbox;