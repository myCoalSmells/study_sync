import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

// css modules
import EPMod from "./EditProfile.module.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditProfile() {
    // for now, this is a temporary way to change data
    // change this to use firebase
    // Student is the name of the object used in the displaying of the data
    let Student = {
        name: 'Michael Liu',
        pfp: "https://i.imgur.com/pkpvLJn.jpeg",
        classMatch: "CS 35L, Math 33B, Physics 1C",
        availTime: "0101001001110000101000101010",
        contactInfo: "myemail@yahoo.com"  
    };



    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [classMatch, setClassMatch] = useState('');
    const [availTime, setAvailTime] = useState('');
    const [pfp, setPFP] = useState('');

    //popup
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setName(Student.name);
        setContactInfo(Student.contactInfo);
        setClassMatch(Student.classMatch);
        setAvailTime(Student.availTime);
        setPFP(Student.pfp)
    }, []);

    // in here, add a function to update student object in the database, instead of Navigate
    // add validation for uder input (correct format)

    const handleSubmit = (e) => {
        e.preventDefault();
        // check validity
        

        // update student object inside the database (new data are in these variables)
        // use effect above sets the variables.
        Student.name = name;
        Student.availTime = availTime;
        Student.contactInfo = contactInfo;
        Student.pfp = pfp;
        Student.classMatch = classMatch;

        // popup code
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 2300);


    };

    return(
        <div>
            
            <form onSubmit={handleSubmit} className={EPMod.container}>
                <div className={EPMod.subcontainer}>
                    <label htmlFor="pfp">Profile Picture:</label>
                    <input type="text" id="pfp" value={pfp} onChange={(e) => setPFP(e.target.value)} />
                </div>
                
                <div className={EPMod.subcontainer}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className={EPMod.subcontainer}>
                    <label htmlFor="contactInfo">Contact Info:</label>
                    <input type="text" id="contactInfo" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
                </div>
                
                <div className={EPMod.subcontainer}>
                    <label htmlFor="classMatch">Class Match:</label>
                    <input type="text" id="classMatch" value={classMatch} onChange={(e) => setClassMatch(e.target.value)} />
                </div>
                
                <div className={EPMod.subcontainer}>
                    <label htmlFor="availTime">Available Times:</label>
                    <input type="text" id="availTime" value={availTime} onChange={(e) => setAvailTime(e.target.value)} />
                </div>

                <div className={EPMod.subcontainer}>
                    <button type="submit">Update Profile</button>
                    
                    <Link to='/profile'>
                        <Button variant="outline-primary">
                            Back to Profile
                        </Button>
                    </Link>
                </div>
                
            </form>

            {showPopup && (
                <div className={EPMod.popup}>
                    <p>Profile updated successfully!</p>
                </div>
            )}
            
        </div>
    );  
}
