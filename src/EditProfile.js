import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

// css modules
import EPMod from "./EditProfile.module.css";
import PPMod from "./ProfilePage.module.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import { auth, firestore } from "./firebase-setup/firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, deleteField } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { async } from '@firebase/util';
import { setDefaultEventParameters } from "firebase/analytics";


export default function EditProfile() {
    // for now, this is a temporary way to change data
    // change this to use firebase
    // Student is the name of the object used in the displaying of the data

    // sample data structure
    // put new user data into here

    let Student = {
        name: 'Michael Liu',
        pfp: "https://i.imgur.com/pkpvLJn.jpeg",
        classes: ["CS 35L", "Math 33B", "Physics 1C"],
        availTime: "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        contactInfo: "myemail@yahoo.com"  
    };


    const [name, setName] = useState(Student.name);
    const [contactInfo, setContactInfo] = useState(Student.contactInfo);
    const [classMatch, setClassMatch] = useState(Student.classes);
    const [availTime, setAvailTime] = useState(Student.availTime);
    const [tempAvailTime, setTempAvailTime] = useState(Student.availTime)
    const [pfp, setPFP] = useState(Student.pfp);

    //const [name, setName] = useState('');
    //const [contactInfo, setContactInfo] = useState('');
    
    const [course, setCourse] = useState('');
    const [myCourses, setMyCourses] = useState(Student.classes);
    //const [availTime, setAvailTime] = useState('');
    const [email, setEmail] = useState("");
    //const [pfp, setPFP] = useState('');
    const [likes, setLikes] = useState([]);
    const [dislikes,setDislikes] = useState([]);
    const [matches, setMatches] = useState([]);
    let [oldCourses, setOldCourses] = useState([]);
    //let [students, setStudents] = useState([]);

    //popup
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setName(Student.name);
        setContactInfo(Student.contactInfo);
        setCourse(Student.classes);
        setAvailTime(Student.availTime);
        setPFP(Student.pfp)
    }, []);

    // in here, add a function to update student object in the database, instead of Navigate
    // add validation for uder input (correct format)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // check validity
        
        // update student object inside the database (new data are in these variables)
        // use effect above sets the variables.
        Student.name = name;
        Student.availTime = tempAvailTime;
        Student.contactInfo = contactInfo;
        Student.pfp = pfp;
        //Student.classMatch = classes;

        // grabs current user from authenticator, and then updates documents through their uid
        const user = auth.currentUser     
        const docRef = doc(firestore, "students", user.uid);
        const docSnap = await getDoc(docRef);
        let courses =  myCourses.map(course => course.name);
        let uid = user.uid;
        await updateDoc(doc(firestore, "students", user.uid), {
                username: name,
                email: contactInfo,
                pfp: pfp,
                availTime: availTime,
                classes: courses,
        });

        // popup code
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 2300);
    };

    const handleCheck = (isChecked, index, e) => {
        const availTimeArr = tempAvailTime.split('');
        if (isChecked) {
          availTimeArr[index] = '1';
        } else {
          availTimeArr[index] = '0';
        }
        const updatedAvailTimeArr = availTimeArr.join('');
        setTempAvailTime(updatedAvailTimeArr);
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
                    <label htmlFor="courses">Courses</label>
                    <input value={classMatch} readOnly={true} />
                    <input type="text" id="courses" placeholder="CS 35L" onChange={(e) => setCourse(e.target.value)} />

                    <button type="button" onClick = {() => {
                        if (course === "") {
                            alert("Empty course name!");
                        }
                        else if (!RegExp('[a-zA-Z]+\\s*[0-9]+[a-zA-Z]*').test(course)){
                            alert("Invalid course name: should be in the form [class][code] eg. COMSCI 35L");
                            return;
                        }
                        else if (myCourses.length >4){
                            alert("five courses max!!");
                            return;
                        }
                        else if (myCourses.some(pair => pair.name === course.replace(/\s/g, "").toUpperCase() )){
                            //if the value is in the array already
                            setCourse('');
                            return;
                        }
                        console.log(myCourses);

                        setCourse('');
                        setMyCourses([...myCourses, {name: course.replace(/\s/g, "").toUpperCase()}]);}
                    }> Add Class</button>
                    <button type="button" onClick = {() => setMyCourses([])}>Reset</button>
                    <ol>
                    {myCourses.map(course => <li key={course.name}>{course.name}</li>)}
                    </ol>
                </div>
                
                <div className={EPMod.subcontainer}>
                    <label htmlFor="availTime">Available Times:</label>
                    <textarea value={tempAvailTime} readOnly={true} style={{fontSize: "16px"}}/>
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
                            <tr>
                                <td className={PPMod.text}>12-1 AM</td>
                                <td><input type="checkbox" checked={tempAvailTime[0] === '1'} onChange={(e) => handleCheck(e.target.checked, 0)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[1] === '1'} onChange={(e) => handleCheck(e.target.checked, 1)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[2] === '1'} onChange={(e) => handleCheck(e.target.checked, 2)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[3] === '1'} onChange={(e) => handleCheck(e.target.checked, 3)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[4] === '1'} onChange={(e) => handleCheck(e.target.checked, 4)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[5] === '1'} onChange={(e) => handleCheck(e.target.checked, 5)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[6] === '1'} onChange={(e) => handleCheck(e.target.checked, 6)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>1-2 AM</td>
                                <td><input type="checkbox" checked={tempAvailTime[7] === '1'} onChange={(e) => handleCheck(e.target.checked, 7)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[8] === '1'} onChange={(e) => handleCheck(e.target.checked, 8)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[9] === '1'} onChange={(e) => handleCheck(e.target.checked, 9)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[10] === '1'} onChange={(e) => handleCheck(e.target.checked, 10)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[11] === '1'} onChange={(e) => handleCheck(e.target.checked, 11)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[12] === '1'} onChange={(e) => handleCheck(e.target.checked, 12)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[13] === '1'} onChange={(e) => handleCheck(e.target.checked, 13)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>2-3 AM</td>
                                <td><input type="checkbox" checked={tempAvailTime[14] === '1'} onChange={(e) => handleCheck(e.target.checked, 14)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[15] === '1'} onChange={(e) => handleCheck(e.target.checked, 15)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[16] === '1'} onChange={(e) => handleCheck(e.target.checked, 16)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[17] === '1'} onChange={(e) => handleCheck(e.target.checked, 17)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[18] === '1'} onChange={(e) => handleCheck(e.target.checked, 18)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[19] === '1'} onChange={(e) => handleCheck(e.target.checked, 19)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[20] === '1'} onChange={(e) => handleCheck(e.target.checked, 20)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>3-4 AM</td>
                                <td><input type="checkbox" checked={tempAvailTime[21] === '1'} onChange={(e) => handleCheck(e.target.checked, 21)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[22] === '1'} onChange={(e) => handleCheck(e.target.checked, 22)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[23] === '1'} onChange={(e) => handleCheck(e.target.checked, 23)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[24] === '1'} onChange={(e) => handleCheck(e.target.checked, 24)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[25] === '1'} onChange={(e) => handleCheck(e.target.checked, 25)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[26] === '1'} onChange={(e) => handleCheck(e.target.checked, 26)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[27] === '1'} onChange={(e) => handleCheck(e.target.checked, 27)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>4-5 AM</td>
                                <td><input type="checkbox" checked={tempAvailTime[28] === '1'} onChange={(e) => handleCheck(e.target.checked, 28)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[29] === '1'} onChange={(e) => handleCheck(e.target.checked, 29)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[30] === '1'} onChange={(e) => handleCheck(e.target.checked, 30)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[31] === '1'} onChange={(e) => handleCheck(e.target.checked, 31)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[32] === '1'} onChange={(e) => handleCheck(e.target.checked, 32)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[33] === '1'} onChange={(e) => handleCheck(e.target.checked, 33)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[34] === '1'} onChange={(e) => handleCheck(e.target.checked, 34)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>5-6 AM</td>
                                <td><input type="checkbox" checked={tempAvailTime[35] === '1'} onChange={(e) => handleCheck(e.target.checked, 35)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[36] === '1'} onChange={(e) => handleCheck(e.target.checked, 36)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[37] === '1'} onChange={(e) => handleCheck(e.target.checked, 37)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[38] === '1'} onChange={(e) => handleCheck(e.target.checked, 38)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[39] === '1'} onChange={(e) => handleCheck(e.target.checked, 39)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[40] === '1'} onChange={(e) => handleCheck(e.target.checked, 40)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[41] === '1'} onChange={(e) => handleCheck(e.target.checked, 41)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>6-7 AM</td>
                                <td><input type="checkbox" checked={tempAvailTime[42] === '1'} onChange={(e) => handleCheck(e.target.checked, 42)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[43] === '1'} onChange={(e) => handleCheck(e.target.checked, 43)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[44] === '1'} onChange={(e) => handleCheck(e.target.checked, 44)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[45] === '1'} onChange={(e) => handleCheck(e.target.checked, 45)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[46] === '1'} onChange={(e) => handleCheck(e.target.checked, 46)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[47] === '1'} onChange={(e) => handleCheck(e.target.checked, 47)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[48] === '1'} onChange={(e) => handleCheck(e.target.checked, 48)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>7-8 AM</td>
                                <td><input type="checkbox" checked={tempAvailTime[49] === '1'} onChange={(e) => handleCheck(e.target.checked, 49)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[50] === '1'} onChange={(e) => handleCheck(e.target.checked, 50)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[51] === '1'} onChange={(e) => handleCheck(e.target.checked, 51)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[52] === '1'} onChange={(e) => handleCheck(e.target.checked, 52)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[53] === '1'} onChange={(e) => handleCheck(e.target.checked, 53)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[54] === '1'} onChange={(e) => handleCheck(e.target.checked, 54)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[55] === '1'} onChange={(e) => handleCheck(e.target.checked, 55)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>8-9 AM</td>
                                <td><input type="checkbox" checked={tempAvailTime[56] === '1'} onChange={(e) => handleCheck(e.target.checked, 56)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[57] === '1'} onChange={(e) => handleCheck(e.target.checked, 57)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[58] === '1'} onChange={(e) => handleCheck(e.target.checked, 58)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[59] === '1'} onChange={(e) => handleCheck(e.target.checked, 59)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[60] === '1'} onChange={(e) => handleCheck(e.target.checked, 60)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[61] === '1'} onChange={(e) => handleCheck(e.target.checked, 61)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[62] === '1'} onChange={(e) => handleCheck(e.target.checked, 62)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>9-10 AM</td>
                                <td><input type="checkbox" checked={tempAvailTime[63] === '1'} onChange={(e) => handleCheck(e.target.checked, 63)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[64] === '1'} onChange={(e) => handleCheck(e.target.checked, 64)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[65] === '1'} onChange={(e) => handleCheck(e.target.checked, 65)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[66] === '1'} onChange={(e) => handleCheck(e.target.checked, 66)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[67] === '1'} onChange={(e) => handleCheck(e.target.checked, 67)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[68] === '1'} onChange={(e) => handleCheck(e.target.checked, 68)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[69] === '1'} onChange={(e) => handleCheck(e.target.checked, 69)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>10-11 AM</td>
                                <td><input type="checkbox" checked={tempAvailTime[70] === '1'} onChange={(e) => handleCheck(e.target.checked, 70)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[71] === '1'} onChange={(e) => handleCheck(e.target.checked, 71)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[72] === '1'} onChange={(e) => handleCheck(e.target.checked, 72)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[73] === '1'} onChange={(e) => handleCheck(e.target.checked, 73)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[74] === '1'} onChange={(e) => handleCheck(e.target.checked, 74)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[75] === '1'} onChange={(e) => handleCheck(e.target.checked, 75)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[76] === '1'} onChange={(e) => handleCheck(e.target.checked, 76)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>11 AM - 12 PM</td>
                                <td><input type="checkbox" checked={tempAvailTime[77] === '1'} onChange={(e) => handleCheck(e.target.checked, 77)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[78] === '1'} onChange={(e) => handleCheck(e.target.checked, 78)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[79] === '1'} onChange={(e) => handleCheck(e.target.checked, 79)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[80] === '1'} onChange={(e) => handleCheck(e.target.checked, 80)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[81] === '1'} onChange={(e) => handleCheck(e.target.checked, 81)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[82] === '1'} onChange={(e) => handleCheck(e.target.checked, 82)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[83] === '1'} onChange={(e) => handleCheck(e.target.checked, 83)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>12-1 PM</td>
                                <td><input type="checkbox" checked={tempAvailTime[84] === '1'} onChange={(e) => handleCheck(e.target.checked, 84)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[85] === '1'} onChange={(e) => handleCheck(e.target.checked, 85)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[86] === '1'} onChange={(e) => handleCheck(e.target.checked, 86)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[87] === '1'} onChange={(e) => handleCheck(e.target.checked, 87)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[88] === '1'} onChange={(e) => handleCheck(e.target.checked, 88)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[89] === '1'} onChange={(e) => handleCheck(e.target.checked, 89)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[90] === '1'} onChange={(e) => handleCheck(e.target.checked, 90)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>1-2 PM</td>
                                <td><input type="checkbox" checked={tempAvailTime[91] === '1'} onChange={(e) => handleCheck(e.target.checked, 91)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[92] === '1'} onChange={(e) => handleCheck(e.target.checked, 92)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[93] === '1'} onChange={(e) => handleCheck(e.target.checked, 93)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[94] === '1'} onChange={(e) => handleCheck(e.target.checked, 94)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[95] === '1'} onChange={(e) => handleCheck(e.target.checked, 95)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[96] === '1'} onChange={(e) => handleCheck(e.target.checked, 96)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[97] === '1'} onChange={(e) => handleCheck(e.target.checked, 97)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>2-3 PM</td>
                                <td><input type="checkbox" checked={tempAvailTime[98] === '1'} onChange={(e) => handleCheck(e.target.checked, 98)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[99] === '1'} onChange={(e) => handleCheck(e.target.checked, 99)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[100] === '1'} onChange={(e) => handleCheck(e.target.checked, 100)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[101] === '1'} onChange={(e) => handleCheck(e.target.checked, 101)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[102] === '1'} onChange={(e) => handleCheck(e.target.checked, 102)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[103] === '1'} onChange={(e) => handleCheck(e.target.checked, 103)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[104] === '1'} onChange={(e) => handleCheck(e.target.checked, 104)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>3-4 PM</td>
                                <td><input type="checkbox" checked={tempAvailTime[105] === '1'} onChange={(e) => handleCheck(e.target.checked, 105)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[106] === '1'} onChange={(e) => handleCheck(e.target.checked, 106)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[107] === '1'} onChange={(e) => handleCheck(e.target.checked, 107)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[108] === '1'} onChange={(e) => handleCheck(e.target.checked, 108)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[109] === '1'} onChange={(e) => handleCheck(e.target.checked, 109)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[110] === '1'} onChange={(e) => handleCheck(e.target.checked, 110)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[111] === '1'} onChange={(e) => handleCheck(e.target.checked, 111)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>4-5 PM</td>
                                <td><input type="checkbox" checked={tempAvailTime[112] === '1'} onChange={(e) => handleCheck(e.target.checked, 112)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[113] === '1'} onChange={(e) => handleCheck(e.target.checked, 113)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[114] === '1'} onChange={(e) => handleCheck(e.target.checked, 114)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[115] === '1'} onChange={(e) => handleCheck(e.target.checked, 115)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[116] === '1'} onChange={(e) => handleCheck(e.target.checked, 116)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[117] === '1'} onChange={(e) => handleCheck(e.target.checked, 117)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[118] === '1'} onChange={(e) => handleCheck(e.target.checked, 118)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>5-6 PM</td>
                                <td><input type="checkbox" checked={tempAvailTime[119] === '1'} onChange={(e) => handleCheck(e.target.checked, 119)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[120] === '1'} onChange={(e) => handleCheck(e.target.checked, 120)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[121] === '1'} onChange={(e) => handleCheck(e.target.checked, 121)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[122] === '1'} onChange={(e) => handleCheck(e.target.checked, 122)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[123] === '1'} onChange={(e) => handleCheck(e.target.checked, 123)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[124] === '1'} onChange={(e) => handleCheck(e.target.checked, 124)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[125] === '1'} onChange={(e) => handleCheck(e.target.checked, 125)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>6-7 PM</td>
                                <td><input type="checkbox" checked={tempAvailTime[126] === '1'} onChange={(e) => handleCheck(e.target.checked, 126)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[127] === '1'} onChange={(e) => handleCheck(e.target.checked, 127)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[128] === '1'} onChange={(e) => handleCheck(e.target.checked, 128)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[129] === '1'} onChange={(e) => handleCheck(e.target.checked, 129)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[130] === '1'} onChange={(e) => handleCheck(e.target.checked, 130)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[131] === '1'} onChange={(e) => handleCheck(e.target.checked, 131)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[132] === '1'} onChange={(e) => handleCheck(e.target.checked, 132)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>7-8 PM</td>
                                <td><input type="checkbox" checked={tempAvailTime[133] === '1'} onChange={(e) => handleCheck(e.target.checked, 133)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[134] === '1'} onChange={(e) => handleCheck(e.target.checked, 134)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[135] === '1'} onChange={(e) => handleCheck(e.target.checked, 135)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[136] === '1'} onChange={(e) => handleCheck(e.target.checked, 136)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[137] === '1'} onChange={(e) => handleCheck(e.target.checked, 137)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[138] === '1'} onChange={(e) => handleCheck(e.target.checked, 138)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[139] === '1'} onChange={(e) => handleCheck(e.target.checked, 139)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>8-9 PM</td>
                                <td><input type="checkbox" checked={tempAvailTime[140] === '1'} onChange={(e) => handleCheck(e.target.checked, 140)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[141] === '1'} onChange={(e) => handleCheck(e.target.checked, 141)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[142] === '1'} onChange={(e) => handleCheck(e.target.checked, 142)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[143] === '1'} onChange={(e) => handleCheck(e.target.checked, 143)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[144] === '1'} onChange={(e) => handleCheck(e.target.checked, 144)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[145] === '1'} onChange={(e) => handleCheck(e.target.checked, 145)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[146] === '1'} onChange={(e) => handleCheck(e.target.checked, 146)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>9-10 PM</td>
                                <td><input type="checkbox" checked={tempAvailTime[147] === '1'} onChange={(e) => handleCheck(e.target.checked, 147)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[148] === '1'} onChange={(e) => handleCheck(e.target.checked, 148)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[149] === '1'} onChange={(e) => handleCheck(e.target.checked, 149)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[150] === '1'} onChange={(e) => handleCheck(e.target.checked, 150)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[151] === '1'} onChange={(e) => handleCheck(e.target.checked, 151)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[152] === '1'} onChange={(e) => handleCheck(e.target.checked, 152)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[153] === '1'} onChange={(e) => handleCheck(e.target.checked, 153)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>10-11 PM</td>
                                <td><input type="checkbox" checked={tempAvailTime[154] === '1'} onChange={(e) => handleCheck(e.target.checked, 154)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[155] === '1'} onChange={(e) => handleCheck(e.target.checked, 155)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[156] === '1'} onChange={(e) => handleCheck(e.target.checked, 156)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[157] === '1'} onChange={(e) => handleCheck(e.target.checked, 157)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[158] === '1'} onChange={(e) => handleCheck(e.target.checked, 158)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[159] === '1'} onChange={(e) => handleCheck(e.target.checked, 159)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[160] === '1'} onChange={(e) => handleCheck(e.target.checked, 160)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>11 PM - 12 AM</td>
                                <td><input type="checkbox" checked={tempAvailTime[161] === '1'} onChange={(e) => handleCheck(e.target.checked, 161)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[162] === '1'} onChange={(e) => handleCheck(e.target.checked, 162)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[163] === '1'} onChange={(e) => handleCheck(e.target.checked, 163)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[164] === '1'} onChange={(e) => handleCheck(e.target.checked, 164)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[165] === '1'} onChange={(e) => handleCheck(e.target.checked, 165)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[166] === '1'} onChange={(e) => handleCheck(e.target.checked, 166)} /></td>
                                <td><input type="checkbox" checked={tempAvailTime[167] === '1'} onChange={(e) => handleCheck(e.target.checked, 167)} /></td>
                            </tr>
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
