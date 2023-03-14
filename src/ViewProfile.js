import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PPMod from "./ProfilePage.module.css";
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import { firestore } from "./firebase-setup/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Header from './Header';

import Redbox from "./ProfilePageStuff/RedBox"
import Greenbox from "./ProfilePageStuff/GreenBox"
// import { black } from "colorette";



export default function ProfilePage() {

    /* 
        when edit student profile button gets clicked
        make sure to send the student's data through to 
        the EditProfilePage.
    */
    const params = useParams(); //get parameters from the url
    const userId = params.userId;

    const auth = getAuth();
    const [username, setUsername] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [availTime, setAvailTime] = useState("");
    const [login, setLogin] = useState(false);
    const [classes, setClasses] = useState([]);
    const [pfp, setPfp] = useState("");
    const [userTime, setUserTime] = useState("");

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            console.log("call");
            const docRef = doc(firestore, "students", userId);
            const docSnap = await getDoc(docRef);
            const docRefU = doc(firestore, "students", user.uid);
            const docSnapU = await getDoc(docRefU);
            if (docSnap.exists()) {
              setUsername(docSnap.get("username"));
              setClasses(docSnap.get("classes"));
              setContactInfo(docSnap.get("email"));
              setAvailTime(docSnap.get("availTime") || []);
              setPfp(docSnap.get("pfp") || "https://i.pinimg.com/originals/1a/68/f7/1a68f758cd8b75d47e480722c3ad6791.png");
              setLogin(true);
              if (docSnapU.exists()) {
                setUserTime(docSnapU.get("availTime"));
              }
            } else {
              console.log("Document could not be found.");
            }
          } else {
            console.log("No one is logged in.");
          }
        });
        // Return a cleanup function to unsubscribe from the listener when the component unmounts
        return unsubscribe;
      }, []);
      
    // generate the schedule table
    function generateTableRows() {
        const daysOfWeek = ['12-1 AM', '1-2 AM', '2-3 AM', '3-4 AM', '4-5 AM', '5-6 AM', '6-7 AM', '7-8 AM', '8-9 AM', '9-10 AM', '10-11 AM', '11-12 AM', '12-1 PM', '1-2 PM', '2-3 PM', '3-4 PM', '4-5 PM', '5-6 PM', '6-7 PM', '7-8 PM', '8-9 PM', '9-10 PM', '10-11 PM', '11-12 PM'];
        const tableRows = [];
        const mergeTime = bitwiseAnd(availTime, userTime);
        console.log(availTime.length);
        console.log(userTime.length);
        for (let i = 0; i < daysOfWeek.length; i++) {
            const day = daysOfWeek[i];
            const availTimes = [];
        
            // populate availability times for current day
            for (let j = 0; j < 7; j++) {
            const index = (i * 7) + j;
            availTimes.push(mergeTime[index]);
            }
        
            // generate table row with availability times for current day
            tableRows.push(
            <tr key={day}>
                <td className={styles.text}>{day}</td>
                {availTimes.map((time, index) => (
                    <td key={index} className={`${styles.text} ${time ? styles.highlight : ''}`}>
                        {time === '0' ? <Redbox/> : <Greenbox/>}
                    </td>
                ))}
                <td></td>
            </tr>
            );
        }
    
        return tableRows;
    }
    const styles = {
        text: PPMod.text,
        highlight: PPMod.highlight,
    };
    const boxStyle = {
        backgroundColor: 'red',
        width: '50px',
        height: '50px',
    };

    if (login === true){
        return(
            <div className={PPMod.header}>
                <Header />
            <div className={PPMod.container}>

                <div className={PPMod.subcontainer}>
                <div style={{
                    width: '125px',
                    height: '125px',
                    borderRadius: '50%',
                    border: '2px solid #104bcb',
                    overflow: 'hidden'
                    }}>
                    <img src={pfp} alt="profile picture" style={{ width: '100%', height: '100%' }} />
                </div>

                    {/* insert pfp here */}
                    <h1 className={PPMod.title}>
                        {username}'s Profile
                    </h1>

    
                </div>
                <p>
                    Classes: {classes.join(", ")}
                </p>
                <p>
                    Contact: {contactInfo}
                </p>
                <p>
                    Shared Schedule: 
                </p>
                <div className={PPMod.container}>
                    <table>
                        <thead>
                            <tr>
                                <th className={PPMod.text}>Time</th>
                                <th className={PPMod.text}>Sun</th>
                                <th className={PPMod.text}>Mon</th>
                                <th className={PPMod.text}>Tue</th>
                                <th className={PPMod.text}>Wed</th>
                                <th className={PPMod.text}>Thu</th>
                                <th className={PPMod.text}>Fri</th>
                                <th className={PPMod.text}>Sat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generateTableRows()}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );
    } else {
        return(
            <div className={PPMod.container}>
                <div className={PPMod.subcontainer}>
                    <h1 className={PPMod.title}>
                        Sign up or log in to view your profile.
                    </h1>
                    <Link to='/login'>
                        <Button variant="outline-primary">
                            Log in
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}