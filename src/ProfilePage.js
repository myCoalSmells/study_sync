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
                    <tr>
                    <td className={PPMod.text}>Sun</td>
                        <td className={PPMod.text}>{Student.availTime[0]}</td>
                        <td className={PPMod.text}>{Student.availTime[7]}</td>
                        <td className={PPMod.text}>{Student.availTime[14]}</td>
                        <td className={PPMod.text}>{Student.availTime[21]}</td>
                    <td></td>
                    </tr>
                    <tr>
                    <td className={PPMod.text}>Mon</td>
                        <td className={PPMod.text}>{Student.availTime[1]}</td>
                        <td className={PPMod.text}>{Student.availTime[8]}</td>
                        <td className={PPMod.text}>{Student.availTime[15]}</td>
                        <td className={PPMod.text}>{Student.availTime[22]}</td>
                    <td></td>
                    </tr>
                    <tr>
                    <td className={PPMod.text}>Tue</td>
                        <td className={PPMod.text}>{Student.availTime[2]}</td>
                        <td className={PPMod.text}>{Student.availTime[9]}</td>
                        <td className={PPMod.text}>{Student.availTime[16]}</td>
                        <td className={PPMod.text}>{Student.availTime[23]}</td>
                    <td></td>
                    </tr>
                    <tr>
                    <td className={PPMod.text}>Wed</td>
                        <td className={PPMod.text}>{Student.availTime[3]}</td>
                        <td className={PPMod.text}>{Student.availTime[10]}</td>
                        <td className={PPMod.text}>{Student.availTime[17]}</td>
                        <td className={PPMod.text}>{Student.availTime[24]}</td>
                    <td></td>
                    </tr>
                    <tr>
                    <td className={PPMod.text}>Thu</td>
                        <td className={PPMod.text}>{Student.availTime[4]}</td>
                        <td className={PPMod.text}>{Student.availTime[11]}</td>
                        <td className={PPMod.text}>{Student.availTime[18]}</td>
                        <td className={PPMod.text}>{Student.availTime[25]}</td>
                    <td></td>
                    </tr>
                    <tr>
                    <td className={PPMod.text}>Fri</td>
                        <td className={PPMod.text}>{Student.availTime[5]}</td>
                        <td className={PPMod.text}>{Student.availTime[12]}</td>
                        <td className={PPMod.text}>{Student.availTime[19]}</td>
                        <td className={PPMod.text}>{Student.availTime[26]}</td>
                    <td></td>
                    </tr>
                    <tr>
                    <td className={PPMod.text}>Sat</td>
                        <td className={PPMod.text}>{Student.availTime[6]}</td>
                        <td className={PPMod.text}>{Student.availTime[13]}</td>
                        <td className={PPMod.text}>{Student.availTime[20]}</td>
                        <td className={PPMod.text}>{Student.availTime[27]}</td>
                    <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}