//import React, { useEffect, useState } from "react";
import React, {useState} from "react";
import PPMod from "./ProfilePage.module.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import { auth, firestore } from "./firebase-setup/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, get, getDoc } from "firebase/firestore";



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
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const tableRows = [];
        
        for (let i = 0; i < daysOfWeek.length; i++) {
            const day = daysOfWeek[i];
            const availTimes = [];
        
            // populate availability times for current day
            for (let j = 0; j < 4; j++) {
            const index = i + (j * 7);
            availTimes.push(availTime[index]);
            }
        
            // generate table row with availability times for current day
            tableRows.push(
            <tr key={day}>
                <td className={styles.text}>{day}</td>
                {availTimes.map((time, index) => (
                    <td key={index} className={`${styles.text} ${time ? styles.highlight : ''}`}>{time === '0' ? <span className={PPMod.red}>X</span> : <span className={PPMod.green}>✓</span>}</td>
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


    // Temp Student Data Format
    // Extract firebase and put into this format?
    let Student = {
        name: 'Michael Liu',
        pfp: "https://i.imgur.com/pkpvLJn.jpeg",
        classMatch: "CS 35L, Math 33B, Physics 1C",
        availTime: "0101001001110000101000101010",
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
                                <th className={PPMod.text}>Day</th>
                                <th className={PPMod.text}>Week 1</th>
                                <th className={PPMod.text}>Week 2</th>
                                <th className={PPMod.text}>Week 3</th>
                                <th className={PPMod.text}>Week 4</th>
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
                    <Link to='/signup'>
                        <Button variant="outline-primary">
                            Log in
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}