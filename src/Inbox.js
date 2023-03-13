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
  const [availTime, setAvailTime] = useState("");
  

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(firestore, "students", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMatches(docSnap.get("matches") || []);
          setAvailTime(docSnap.get("availTime"));
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
    console.log(matches);
    async function createDivs() {
      const matches_arr = [];
      for (let i=1; i<matches.length; i++){
        let id = matches[i];
        if (!id){
          return;
        }
        console.log(id);
        const docRef = doc(firestore, "students", id);
        const docSnap = await getDoc(docRef);
        const _name = docSnap.get("username");
        const _classes = docSnap.get("classes");
        const _email = docSnap.get("email");
        const _time = docSnap.get("availTime");
        let _pfp = docSnap.get("pfp");
        //const _profileLink = "/login/"+toString(id);
        if (!_pfp){
          _pfp = "https://i.pinimg.com/originals/1a/68/f7/1a68f758cd8b75d47e480722c3ad6791.png";
        }


        // janky bit string comparison implementation
        onAuthStateChanged(auth, async (user) => {
          const docRef = doc(firestore, "students", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              setAvailTime(docSnap.get("availTime"));
          }
        });
        let bitwiseAnd = "";
        if (availTime.length > _time.length) {
          for (let i = 0; i < _time.length; i++) {
            if (availTime[i] === _time[i]) {
              bitwiseAnd = bitwiseAnd + "1";
            } else {
              bitwiseAnd = bitwiseAnd + "0";
            }
          }
        } else {
          for (let i = 0; i < availTime.length; i++) {
            if (availTime[i] === _time[i]) {
              bitwiseAnd = bitwiseAnd + "1";
            } else { 
              bitwiseAnd = bitwiseAnd + "0";
            }
          }
        }
        let mergeTime = 0;
        for (let i = 0; i < bitwiseAnd.length; i++) {
          if (bitwiseAnd[i]) {
            mergeTime = mergeTime + 1;
          }
        }
        let _similarity = Math.trunc(mergeTime/168 * 100).toString() + "% Availability";


        let format = (
          <div className={InboxMod.box}>
            <div className={InboxMod["left-box"]} style={{ backgroundImage: `url(${_pfp})` }}></div>
            <div className={InboxMod["center-box"]}>
              <div className={InboxMod.field}>{_classes.join(", ")}</div>
              <div className={InboxMod.field}>{_name}</div>
              <div className={InboxMod.field}>{_email}</div>
              <div className={InboxMod.field}>{_similarity}</div>
            </div>
            <Link to={`/profile/${id}`}>
            <button>View Profile</button>
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