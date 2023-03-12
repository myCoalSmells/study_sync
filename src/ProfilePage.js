//import React, { useEffect, useState } from "react";
import React from "react";
import PPMod from "./ProfilePage.module.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";



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


    // Temp Student Data Format
    // Extract firebase and put into this format?
    let Student = {
        name: 'Michael Liu',
        pfp: "https://i.imgur.com/pkpvLJn.jpeg",
        classMatch: "CS 35L, Math 33B, Physics 1C",
        availTime: "0101001001110000101000101010",
        contactInfo: "myemail@yahoo.com"  
    };


    return(
        <div className={PPMod.container}>
            <div className={PPMod.subcontainer}>
                <div>
                    
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
        </div>
    );
}