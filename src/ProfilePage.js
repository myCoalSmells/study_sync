//import React, { useEffect, useState } from "react";
import React, {useState} from "react";
import PPMod from "./ProfilePage.module.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import { auth, firestore } from "./firebase-setup/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, get, getDoc } from "firebase/firestore";

import Redbox from "./ProfilePageStuff/RedBox"
import Greenbox from "./ProfilePageStuff/GreenBox"



export default function ProfilePage() {

    /* 
        when edit student profile button gets clicked
        make sure to send the student's data through to 
        the EditProfilePage.
    */
    const auth = getAuth();
    const [username, setUsername] = useState("");
    const [classMatch, setClassMatch] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [availTime, setAvailTime] = useState("");
    const [login, setLogin] = useState(false);

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRef = doc(firestore, "students", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUsername(docSnap.get("username"));
                setClassMatch(docSnap.get("classMatch"));
                setContactInfo(docSnap.get("email"));
                setAvailTime(docSnap.get("availTime"));
                setLogin(true);
            } else {
                console.log("Document could not be found.");
            }
        } else {
                console.log("No one is logged in.");
        }
        
    })
    // generate the schedule table
    function generateTableRows() {
        const daysOfWeek = ['12-1 AM', '1-2 AM', '2-3 AM', '3-4 AM', '4-5 AM', '5-6 AM', '6-7 AM', '7-8 AM', '8-9 AM', '9-10 AM', '10-11 AM', '11-12 AM', '12-1 PM', '1-2 PM', '2-3 PM', '3-4 PM', '4-5 PM', '5-6 PM', '6-7 PM', '7-8 PM', '8-9 PM', '9-10 PM', '10-11 PM', '11-12 PM'];
        const tableRows = [];
        
        for (let i = 0; i < daysOfWeek.length; i++) {
            const day = daysOfWeek[i];
            const availTimes = [];
        
            // populate availability times for current day
            for (let j = 0; j < 7; j++) {
            const index = i + (j * 7);
            availTimes.push(availTime[index]);
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

    // Temp Student Data Format
    // Extract firebase and put into this format?
    let Student = {
        name: 'Michael Liu',
        pfp: "https://i.imgur.com/pkpvLJn.jpeg",
        classMatch: "CS 35L, Math 33B, Physics 1C",
        availTime: "000000111100000000011100000110001010000101011000111101101011110111100101000101110111000000010001010111101100100110101101100001011100010000011101100001010100011010000100",
        contactInfo: "myemail@yahoo.com"  
    };

    if (login === true){
        return(
            <div className={PPMod.container}>
                <div className={PPMod.subcontainer}>
                    <div>
                        
                    </div>
                    <h1 className={PPMod.title}>
                        {username}'s Profile
                    </h1>
                    <Link to='/editprofile'>
                        <Button variant="outline-primary">
                            Edit Profile
                        </Button>
                    </Link>
    
                </div>
                <p>
                    Classes: {classMatch}
                </p>
                <p>
                    Contact: {contactInfo}
                </p>
                <p>
                    Schedule: 
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