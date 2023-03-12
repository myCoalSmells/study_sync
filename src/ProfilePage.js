//import React, { useEffect, useState } from "react";
import React, { useState } from "react";
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
            availTimes.push(Student.availTime[index]);
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
                const data = docSnap.data();
                setUsername(docSnap.get("username"));
                setClassMatch(docSnap.get("classMatch"));
                setContactInfo(docSnap.get("email"));
                setAvailTime(docSnap.get("availTime"));
                setLogin(true);
            } else {
            console.log("Document does not exist");
            }
        console.log(docRef.id);

        
    } else {
        console.log("not logged in");
    }
    });

    /*
   const DAYS = 7;
   const WEEKS = 4;
    // Temp Student Data Format
    // Extract firebase and put into this format?
    let Student = {
        name: 'Michael Liu',
        pfp: "https://i.imgur.com/pkpvLJn.jpeg",
        classMatch: "CS 35L, Math 33B, Physics 1C",
        availTime: "0101001001110000101000101010",
        contactInfo: "myemail@yahoo.com"  
    };
    */

    if (login === true) {
        return(
            <div className={PPMod.container}>
                <div className={PPMod.subcontainer}>
                    <h1 className={PPMod.title}>
                        {username}'s Profile
                    </h1>
                    <Button variant="outline-primary">
                        Edit Profile
                    </Button>
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
                <div>
                    <Button variant="outline-secondary">Sun {availTime[0]}</Button>
                    <Button variant="outline-secondary">Mon {availTime[1]}</Button>
                    <Button variant="outline-secondary">Tue {availTime[2]}</Button>
                    <Button variant="outline-secondary">Wed {availTime[3]}</Button>
                    <Button variant="outline-secondary">Thu {availTime[4]}</Button>
                    <Button variant="outline-secondary">Fri {availTime[5]}</Button>
                    <Button variant="outline-secondary">Sat {availTime[6]}</Button>
                </div>
                <div>
                    <Button variant="outline-secondary">Sun {availTime[7]}</Button>
                    <Button variant="outline-secondary">Mon {availTime[8]}</Button>
                    <Button variant="outline-secondary">Tue {availTime[9]}</Button>
                    <Button variant="outline-secondary">Wed {availTime[10]}</Button>
                    <Button variant="outline-secondary">Thu {availTime[11]}</Button>
                    <Button variant="outline-secondary">Fri {availTime[12]}</Button>
                    <Button variant="outline-secondary">Sat {availTime[13]}</Button>
                </div>
                <div>
                    <Button variant="outline-secondary">Sun {availTime[14]}</Button>
                    <Button variant="outline-secondary">Mon {availTime[15]}</Button>
                    <Button variant="outline-secondary">Tue {availTime[16]}</Button>
                    <Button variant="outline-secondary">Wed {availTime[17]}</Button>
                    <Button variant="outline-secondary">Thu {availTime[18]}</Button>
                    <Button variant="outline-secondary">Fri {availTime[19]}</Button>
                    <Button variant="outline-secondary">Sat {availTime[20]}</Button>
                </div>
                <div>
                    <Button variant="outline-secondary">Sun {availTime[21]}</Button>
                    <Button variant="outline-secondary">Mon {availTime[22]}</Button>
                    <Button variant="outline-secondary">Tue {availTime[23]}</Button>
                    <Button variant="outline-secondary">Wed {availTime[24]}</Button>
                    <Button variant="outline-secondary">Thu {availTime[25]}</Button>
                    <Button variant="outline-secondary">Fri {availTime[26]}</Button>
                    <Button variant="outline-secondary">Sat {availTime[27]}</Button>
                </div>
                <h1 className={PPMod.title}>
                    {Student.name}'s Profile
                </h1>
                <Link to='/editprofile'>
                    <Button variant="outline-primary">
                        Edit Profile
                    </Button>
                </Link>

            </div>
            <p>
                Classes: {Student.classMatch}
            </p>
            <p>
                Contact: {Student.contactInfo}
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
    );
}
}