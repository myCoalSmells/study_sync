import React, { useState, useEffect } from "react";
import InboxMod from "./Inbox.module.css"
import PPMod from "./ProfilePage.module.css";
import { auth, firestore } from "./firebase-setup/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc,getDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import { async } from "@firebase/util";

  
function Inbox() {
  const Nav = useNavigate();
  const [matches, setMatches] = useState([])
  const [login, setLogin] = useState(false);
  const [matches_arr, setMatchesArr] = useState([]);
  

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(firestore, "students", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMatches(docSnap.get("matches") || []);
          console.log("got matches");
          console.log(matches);
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
    async function createDivs() {
      const matches_arr = [];
      for (let i=1; i<matches.length; i++){
        let id = matches[i];
        if (!id){
          return;
        }
        const docRef = doc(firestore, "students", id);
        const docSnap = await getDoc(docRef);
        const _name = docSnap.get("username");
        const _classes = docSnap.get("classes");
        const _email = docSnap.get("email");
        let _pfp = docSnap.get("pfp");
        //const _profileLink = "/login/"+toString(id);
        if (!_pfp){
          _pfp = "https://i.pinimg.com/originals/1a/68/f7/1a68f758cd8b75d47e480722c3ad6791.png";
        }
        let format = (
          <div className={InboxMod.box}>
            <div className={InboxMod["left-box"]} style={{ backgroundImage: `url(${_pfp})` }}></div>
            <div className={InboxMod["center-box"]}>
              <div className={InboxMod.field}>{_name}</div>
              <div className={InboxMod.field}>Classes:   {_classes.join(", ")}</div>
              <div className={InboxMod.field}>{_email}</div>
            </div>
            <Link to={`/profile/${id}`}>
            <button className={InboxMod.options}>View Profile</button>
            </Link>
            
          </div>
        )
        matches_arr.push(format)
      }
      return matches_arr;
    }
    createDivs().then(setMatchesArr);
  }, [matches]);

  return(
    <div className={PPMod.container}>
      {matches_arr}
    </div>
  )
}

export default Inbox;