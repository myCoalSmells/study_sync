//import React, { useEffect, useState } from "react";
import React from "react";
import PPMod from "./ProfilePage.module.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


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
                <Button variant="outline-primary">
                    Edit Profile
                </Button>
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
            <div>
                <Button variant="outline-secondary">Sun {Student.availTime[0]}</Button>
                <Button variant="outline-secondary">Mon {Student.availTime[1]}</Button>
                <Button variant="outline-secondary">Tue {Student.availTime[2]}</Button>
                <Button variant="outline-secondary">Wed {Student.availTime[3]}</Button>
                <Button variant="outline-secondary">Thu {Student.availTime[4]}</Button>
                <Button variant="outline-secondary">Fri {Student.availTime[5]}</Button>
                <Button variant="outline-secondary">Sat {Student.availTime[6]}</Button>
            </div>
            <div>
                <Button variant="outline-secondary">Sun {Student.availTime[7]}</Button>
                <Button variant="outline-secondary">Mon {Student.availTime[8]}</Button>
                <Button variant="outline-secondary">Tue {Student.availTime[9]}</Button>
                <Button variant="outline-secondary">Wed {Student.availTime[10]}</Button>
                <Button variant="outline-secondary">Thu {Student.availTime[11]}</Button>
                <Button variant="outline-secondary">Fri {Student.availTime[12]}</Button>
                <Button variant="outline-secondary">Sat {Student.availTime[13]}</Button>
            </div>
            <div>
                <Button variant="outline-secondary">Sun {Student.availTime[14]}</Button>
                <Button variant="outline-secondary">Mon {Student.availTime[15]}</Button>
                <Button variant="outline-secondary">Tue {Student.availTime[16]}</Button>
                <Button variant="outline-secondary">Wed {Student.availTime[17]}</Button>
                <Button variant="outline-secondary">Thu {Student.availTime[18]}</Button>
                <Button variant="outline-secondary">Fri {Student.availTime[19]}</Button>
                <Button variant="outline-secondary">Sat {Student.availTime[20]}</Button>
            </div>
            <div>
                <Button variant="outline-secondary">Sun {Student.availTime[21]}</Button>
                <Button variant="outline-secondary">Mon {Student.availTime[22]}</Button>
                <Button variant="outline-secondary">Tue {Student.availTime[23]}</Button>
                <Button variant="outline-secondary">Wed {Student.availTime[24]}</Button>
                <Button variant="outline-secondary">Thu {Student.availTime[25]}</Button>
                <Button variant="outline-secondary">Fri {Student.availTime[26]}</Button>
                <Button variant="outline-secondary">Sat {Student.availTime[27]}</Button>
            </div>
        </div>
    );
}