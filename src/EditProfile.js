import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

// css modules
import EPMod from "./EditProfile.module.css";
import PPMod from "./ProfilePage.module.css";
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
        availTime: "101001011010001111100101011001101101011110110010110101001101000011100110101000011000000110010101001100110010100000100101101101001011101110100000110001000111001000001001",
        contactInfo: "myemail@yahoo.com"  
    };


    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [classMatch, setClassMatch] = useState('');
    const [availTime, setAvailTime] = useState('');
    const [pfp, setPFP] = useState('');

    //popup (separate from others)
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

    // checkbox check
    const handleCheck = (isChecked, index, e) => {
        const availTimeArr = availTime.split('');
        if (isChecked) {
          availTimeArr[index] = '1';
        } else {
          availTimeArr[index] = '0';
        }
        const updatedAvailTimeArr = availTimeArr.join('');
        setAvailTime(updatedAvailTimeArr);
    };

    // generate the schedule table
    function generateTableRows() {
        const times = ['12-1 AM', '1-2 AM', '2-3 AM', '3-4 AM', '4-5 AM', '5-6 AM', '6-7 AM', '7-8 AM', '8-9 AM', '9-10 AM', '10-11 AM', '11-12 AM', '12-1 PM', '1-2 PM', '2-3 PM', '3-4 PM', '4-5 PM', '5-6 PM', '6-7 PM', '7-8 PM', '8-9 PM', '9-10 PM', '10-11 PM', '11-12 PM'];
        const tableRows = [];
        
        for (let i = 0; i < times.length; i++) {
            const day = times[i];
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
                        <input type="checkbox" checked={availTime[index] === '1'} onChange={(e) => handleCheck(e.target.checked, index)} />
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
                    <textarea value={availTime} readOnly='true' style={{fontSize: "16px"}}/>

                    <input type="checkbox" checked={availTime[0] === '1'} onChange={(e) => handleCheck(e.target.checked, 0)} />

                </div>
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
