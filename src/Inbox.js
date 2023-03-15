import React, { useState, useEffect } from "react";
import InboxMod from "./Inbox.module.css"
import PPMod from "./ProfilePage.module.css";
import { auth, firestore } from "./firebase-setup/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc,getDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import { async } from "@firebase/util";

  
function Inbox() {
  const Nav = useNavigate();
  const [matches, setMatches] = useState([])
  const [login, setLogin] = useState(false);
  const [matches_arr, setMatchesArr] = useState([]);
  const [userId, setUserId] = useState("");
  const [availTime, setAvailTime] = useState("");

  function bitwiseAnd(str1, str2) {
    let result = "";
  
    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
      if (str1[i] === "1" && str2[i] === "1") {
        result += "1";
      } else {
        result += "0";
      }
    }
  
    return result;
  }
  function countMatchingDigits(str1, str2) {
    let count = 0;
  
    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
      if (str1[i] === "1" && str2[i] === "1") {
        count++;
      }
    }
  
    return count;
  }
  
  
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
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
  async function removeMatch(id){
    console.log("removing matches");
    //function that removes matches from both parties' ends
    const otherRef = doc(firestore,"students", id)
    const otherSnap = await getDoc(otherRef);
    const myRef = doc(firestore, "students", userId);
    const mySnap = await getDoc(myRef);
    
    async function removeFromArr(val,array){
      if (array.length ===0 ){ return;}
      console.log("called remove from array");
      console.log(array);
      const index = array.indexOf(val);
      if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
      }
      return array;

    }
    //update the matches arrays to remove each other from them
    const otherMatches_updated = await removeFromArr(userId, otherSnap.get("matches"));
    const myMatches_updated = await removeFromArr(id, mySnap.get("matches"));
    console.log(otherMatches_updated);
    console.log(myMatches_updated);
    //set the values of the updated data into the db
    try {
      await updateDoc(otherRef,{
        matches: otherMatches_updated
      })
      await updateDoc(myRef,{
        matches: myMatches_updated
      })
      
    } catch (error) {
      console.error(error);
      
    }


  }
  useEffect(() => {
    async function createDivs() {
      const matches_arr = [];
      for (let i=1; i<matches.length; i++){   //NOTE: matches always have a "" at the start, which is why we start from 1 not zero
        let id = matches[i];
        if (!id){
          return;
        }
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
          if(user && user.uid){
            const docRef = doc(firestore, "students", user.uid);
          }
          if (docSnap.exists()) {
              setAvailTime(docSnap.get("availTime"));
          }
        });
        const _similarity = countMatchingDigits(_time, availTime).toString() + " shared hours";


        let format = (
          <div className={InboxMod.box}>
            <div className={InboxMod["left-box"]} style={{ backgroundImage: `url(${_pfp})` }}></div>
            <div className={InboxMod["center-box"]}>
              <div className={InboxMod.field}>{_name}</div>
              <div className={InboxMod.field}>Classses:   {_classes.join(", ")}</div>
              <div className={InboxMod.field}>{_email}</div>
              <div className={InboxMod.field}>{_similarity}</div>
            </div>
            <div className={InboxMod.buttonBox}>
            <div>
              <Link to={`/profile/${id}`}>
              <button className={InboxMod.options}>View Profile</button>
              </Link>              
            </div>
            <div>
                <button className={InboxMod.options} onClick={()=>
                removeMatch(id)
                }>Remove Match</button>              
            </div>


            </div>

            
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