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
    let availableTimes = [4][7];

    return(
        <div className={PPMod.container}>
            <div className={PPMod.subcontainer}>
                <div>
                    
                </div>
                <h1 className={PPMod.title}>
                    StudentName's Profile
                </h1>
                <Button variant="outline-primary">
                    Edit Profile
                </Button>
            </div>
            <p>
                Classes: class1 , class2 , class3 , ...
            </p>
            <p>
                Schedule: 
            </p>
            <div>
                <Button variant="outline-secondary">Sun</Button>
                <Button variant="outline-secondary">Mon</Button>
                <Button variant="outline-secondary">Tue</Button>
                <Button variant="outline-secondary">Wed</Button>
                <Button variant="outline-secondary">Thu</Button>
                <Button variant="outline-secondary">Fri</Button>
                <Button variant="outline-secondary">Sat</Button>
            </div>
            <div>
                <Button variant="outline-secondary">Sun</Button>
                <Button variant="outline-secondary">Mon</Button>
                <Button variant="outline-secondary">Tue</Button>
                <Button variant="outline-secondary">Wed</Button>
                <Button variant="outline-secondary">Thu</Button>
                <Button variant="outline-secondary">Fri</Button>
                <Button variant="outline-secondary">Sat</Button>
            </div>
            <div>
                <Button variant="outline-secondary">Sun</Button>
                <Button variant="outline-secondary">Mon</Button>
                <Button variant="outline-secondary">Tue</Button>
                <Button variant="outline-secondary">Wed</Button>
                <Button variant="outline-secondary">Thu</Button>
                <Button variant="outline-secondary">Fri</Button>
                <Button variant="outline-secondary">Sat</Button>
            </div>
            <div>
                <Button variant="outline-secondary">Sun</Button>
                <Button variant="outline-secondary">Mon</Button>
                <Button variant="outline-secondary">Tue</Button>
                <Button variant="outline-secondary">Wed</Button>
                <Button variant="outline-secondary">Thu</Button>
                <Button variant="outline-secondary">Fri</Button>
                <Button variant="outline-secondary">Sat</Button>
            </div>
        </div>
    );
}