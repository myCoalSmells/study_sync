import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

// css modules
import EPMod from "./EditProfile.module.css";
import PPMod from "./ProfilePage.module.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import { auth, firestore } from "./firebase-setup/firebase";
import { setPersistence, browserLocalPersistence, sendPasswordResetEmail,
    confirmPasswordReset, deleteUser } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, deleteField } from "firebase/firestore";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
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
        availTime: "000110001000010011011100010111111010000010010000101011111101101000100010100101001110111001011000101011111010011010001101110011011001110000011000011101010000010000111101",
        contactInfo: "myemail@yahoo.com"  
    };


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [classMatch, setClassMatch] = useState(Student.classes);
    const [availTime, setAvailTime] = useState(Student.availTime);
    const [tempAvailTime, setTempAvailTime] = useState(Student.availTime)
    const [pfp, setPFP] = useState(Student.pfp);
    const Nav = useNavigate();

    //const [name, setName] = useState('');
    //const [contactInfo, setContactInfo] = useState('');
    
    const [course, setCourse] = useState('');
    const [myCourses, setMyCourses] = useState([]);
    //const [availTime, setAvailTime] = useState('');
    //const [pfp, setPFP] = useState('');
    const [likes, setLikes] = useState([]);
    const [dislikes,setDislikes] = useState([]);
    const [matches, setMatches] = useState([]);
    let [viewCourses, setViewCourses] = useState("");
    //let [students, setStudents] = useState([]);

    //popup
    const [showPopup, setShowPopup] = useState(false);
    // const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        //setName(Student.name);
        //setCourse(Student.classes);
        //setAvailTime(Student.availTime);
        setPFP(Student.pfp)
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            const docRef = doc(firestore, "students", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setName(docSnap.get("username"));
                setEmail(docSnap.get("email"));
                setPFP(docSnap.get("pfp"));
                let n = 0
                setTempAvailTime(docSnap.get("availTime") || String(n).padStart(167, "0"));
                console.log(tempAvailTime);
                const mCourses = docSnap.get("classes");
                if (mCourses.length) {
                    setViewCourses(mCourses[0]);
                    //const courseIds =  mCourses.map(course => course.name)
                    setMyCourses(mCourses);
                    console.log(mCourses);
                } else {
                    setViewCourses("EXAMPLE101");
                    setMyCourses([]);
                }
            }
        });
        return unsubscribe;
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
        Student.pfp = pfp;
        //Student.classMatch = classes;

        // grabs current user from authenticator, and then updates documents through their uid
        const user = auth.currentUser     
        const docRef = doc(firestore, "students", user.uid);
        const docSnap = await getDoc(docRef);
        let courses =  myCourses.map(course => course.name);
        let uid = user.uid;
        console.log(name);
        console.log(myCourses);
        if (typeof courses !== "undefined") {
            courses = myCourses;
        }
        await updateDoc(doc(firestore, "students", user.uid), {
                username: name,
                pfp: pfp,
                availTime: tempAvailTime,
                classes: courses,
        });

        // popup code
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 2300);

        console.log("Student profile updated!");
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

    // box highlight
    const boxCheck = (index, green) => {
        const availTimeArr = tempAvailTime.split('');
        if (green) {
          availTimeArr[index] = '0';
        } else {
          availTimeArr[index] = '1';
        }
        const updatedAvailTimeArr = availTimeArr.join('');
        setTempAvailTime(updatedAvailTimeArr);

        console.log(index, green);
    };

    const changePassword = () => {
        sendPasswordResetEmail(auth, email)
        .then((userCredential) =>{
            console.log(userCredential);
            alert("An email has been sent with a link to change your password.");

        })
        .catch((error) => {
            console.log(error);
            console.log("email not sent");
            alert("There was an error in sending an email to change your password.")
        })
    }

    const deleteAccount = () => {
        // setShowDeletePopup(true);
        deleteUser(auth.currentUser)
        .then((userCredential) =>{
            console.log(userCredential);
            console.log("user has been deleted")
            alert("Your account has been deleted.");
            Nav("/");
        })
        .catch((error) => {
            console.log(error);
            console.log("email not sent");
            alert("There was an error in sending an email to change your password.")
        })
    }

    return(
        <div>
            
            <form onSubmit={handleSubmit} className={EPMod.container}>
                <div className={EPMod.subcontainer}>
                    <label htmlFor="pfp">Profile Picture:</label>
                    <input type="text" id="pfp" placeholder={pfp} onChange={(e) => setPFP(e.target.value)} />
                </div>
                
                <div className={EPMod.subcontainer}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" placeholder={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className={EPMod.subcontainer}>
                    <label htmlFor="courses">Courses</label>
                    <input type="text" id="courses" placeholder={viewCourses}  onChange={(e) => setCourse(e.target.value)} />
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
                        setMyCourses([...myCourses, course.replace(/\s/g, "").toUpperCase()]);}
                    }> Add Class</button>
                    <button type="button" onClick = {() => setMyCourses([])}>Reset</button>
                    <ol>
                    {myCourses.map(course => <li key={course.name}>{course}</li>)}
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
                                <td><button className={tempAvailTime[0] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(0, tempAvailTime[0] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[1] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(1, tempAvailTime[1] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[2] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(2, tempAvailTime[2] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[3] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(3, tempAvailTime[3] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[4] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(4, tempAvailTime[4] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[5] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(5, tempAvailTime[5] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[6] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(6, tempAvailTime[6] === '1' ? true : false)}></button></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>1-2 AM</td>
                                <td><button className={tempAvailTime[7] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(7, tempAvailTime[7] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[8] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(8, tempAvailTime[8] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[9] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(9, tempAvailTime[9] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[10] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(10, tempAvailTime[10] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[11] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(11, tempAvailTime[11] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[12] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(12, tempAvailTime[12] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[13] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(13, tempAvailTime[13] === '1' ? true : false)}></button></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>2-3 AM</td>
                                <td><button className={tempAvailTime[14] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(14, tempAvailTime[14] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[15] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(15, tempAvailTime[15] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[16] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(16, tempAvailTime[16] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[17] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(17, tempAvailTime[17] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[18] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(18, tempAvailTime[18] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[19] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(19, tempAvailTime[19] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[20] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(20, tempAvailTime[20] === '1' ? true : false)}></button></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>3-4 AM</td>
                                <td><button className={tempAvailTime[21] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(21, tempAvailTime[21] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[22] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(22, tempAvailTime[22] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[23] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(23, tempAvailTime[23] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[24] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(24, tempAvailTime[24] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[25] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(25, tempAvailTime[25] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[26] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(26, tempAvailTime[26] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[27] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(27, tempAvailTime[27] === '1' ? true : false)}></button></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>4-5 AM</td>
                                <td><button className={tempAvailTime[28] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(28, tempAvailTime[28] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[29] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(29, tempAvailTime[29] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[30] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(30, tempAvailTime[30] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[31] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(31, tempAvailTime[31] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[32] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(32, tempAvailTime[32] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[33] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(33, tempAvailTime[33] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[34] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(34, tempAvailTime[34] === '1' ? true : false)}></button></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>5-6 AM</td>
                                <td><button className={tempAvailTime[35] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(35, tempAvailTime[35] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[36] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(36, tempAvailTime[36] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[37] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(37, tempAvailTime[37] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[38] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(38, tempAvailTime[38] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[39] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(39, tempAvailTime[39] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[40] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(40, tempAvailTime[40] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[41] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(41, tempAvailTime[41] === '1' ? true : false)}></button></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>6-7 AM</td>
                                <td><button className={tempAvailTime[42] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(42, tempAvailTime[42] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[43] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(43, tempAvailTime[43] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[44] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(44, tempAvailTime[44] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[45] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(45, tempAvailTime[45] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[46] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(46, tempAvailTime[46] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[47] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(47, tempAvailTime[47] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[48] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(48, tempAvailTime[48] === '1' ? true : false)}></button></td>

                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>7-8 AM</td>
                                <td><button className={tempAvailTime[49] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(49, tempAvailTime[49] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[50] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(50, tempAvailTime[50] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[51] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(51, tempAvailTime[51] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[52] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(52, tempAvailTime[52] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[53] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(53, tempAvailTime[53] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[54] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(54, tempAvailTime[54] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[55] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(55, tempAvailTime[55] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>8-9 AM</td>
                                <td><button className={tempAvailTime[56] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(56, tempAvailTime[56] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[57] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(57, tempAvailTime[57] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[58] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(58, tempAvailTime[58] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[59] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(59, tempAvailTime[59] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[60] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(60, tempAvailTime[60] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[61] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(61, tempAvailTime[61] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[62] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(62, tempAvailTime[62] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>9-10 AM</td>
                                <td><button className={tempAvailTime[63] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(63, tempAvailTime[63] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[64] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(64, tempAvailTime[64] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[65] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(65, tempAvailTime[65] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[66] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(66, tempAvailTime[66] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[67] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(67, tempAvailTime[67] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[68] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(68, tempAvailTime[68] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[69] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(69, tempAvailTime[69] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>10-11 AM</td>
                                <td><button className={tempAvailTime[70] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(70, tempAvailTime[70] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[71] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(71, tempAvailTime[71] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[72] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(72, tempAvailTime[72] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[73] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(73, tempAvailTime[73] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[74] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(74, tempAvailTime[74] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[75] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(75, tempAvailTime[75] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[76] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(76, tempAvailTime[76] === '1' ? true : false)}></button></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>11 AM - 12 PM</td>
                                <td><button className={tempAvailTime[77] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(77, tempAvailTime[77] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[78] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(78, tempAvailTime[78] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[79] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(79, tempAvailTime[79] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[80] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(80, tempAvailTime[80] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[81] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(81, tempAvailTime[81] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[82] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(82, tempAvailTime[82] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[83] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(83, tempAvailTime[83] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>12-1 PM</td>
                                <td><button className={tempAvailTime[84] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(84, tempAvailTime[84] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[85] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(85, tempAvailTime[85] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[86] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(86, tempAvailTime[86] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[87] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(87, tempAvailTime[87] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[88] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(88, tempAvailTime[88] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[89] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(89, tempAvailTime[89] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[90] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(90, tempAvailTime[90] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>1-2 PM</td>
                                <td><button className={tempAvailTime[91] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(91, tempAvailTime[91] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[92] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(92, tempAvailTime[92] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[93] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(93, tempAvailTime[93] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[94] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(94, tempAvailTime[94] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[95] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(95, tempAvailTime[95] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[96] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(96, tempAvailTime[96] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[97] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(97, tempAvailTime[97] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>2-3 PM</td>
                                <td><button className={tempAvailTime[98] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(98, tempAvailTime[98] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[99] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(99, tempAvailTime[99] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[100] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(100, tempAvailTime[100] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[101] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(101, tempAvailTime[101] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[102] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(102, tempAvailTime[102] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[103] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(103, tempAvailTime[103] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[104] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(104, tempAvailTime[104] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>3-4 PM</td>
                                <td><button className={tempAvailTime[105] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(105, tempAvailTime[105] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[106] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(106, tempAvailTime[106] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[107] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(107, tempAvailTime[107] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[108] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(108, tempAvailTime[108] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[109] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(109, tempAvailTime[109] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[110] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(110, tempAvailTime[110] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[111] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(111, tempAvailTime[111] === '1' ? true : false)}></button></td>

                            </tr>
                            <tr>
                                <td className={PPMod.text}>4-5 PM</td>
                                <td><button className={tempAvailTime[112] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(112, tempAvailTime[112] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[113] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(113, tempAvailTime[113] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[114] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(114, tempAvailTime[114] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[115] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(115, tempAvailTime[115] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[116] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(116, tempAvailTime[116] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[117] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(117, tempAvailTime[117] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[118] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(118, tempAvailTime[118] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>5-6 PM</td>
                                <td><button className={tempAvailTime[119] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(119, tempAvailTime[119] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[120] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(120, tempAvailTime[120] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[121] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(121, tempAvailTime[121] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[122] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(122, tempAvailTime[122] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[123] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(123, tempAvailTime[123] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[124] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(124, tempAvailTime[124] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[125] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(125, tempAvailTime[125] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>6-7 PM</td>
                                <td><button className={tempAvailTime[126] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(126, tempAvailTime[126] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[127] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(127, tempAvailTime[127] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[128] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(128, tempAvailTime[128] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[129] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(129, tempAvailTime[129] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[130] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(130, tempAvailTime[130] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[131] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(131, tempAvailTime[131] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[132] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(132, tempAvailTime[132] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>7-8 PM</td>
                                <td><button className={tempAvailTime[133] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(133, tempAvailTime[133] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[134] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(134, tempAvailTime[134] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[135] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(135, tempAvailTime[135] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[136] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(136, tempAvailTime[136] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[137] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(137, tempAvailTime[137] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[138] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(138, tempAvailTime[138] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[139] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(139, tempAvailTime[139] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>8-9 PM</td>
                                <td><button className={tempAvailTime[140] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(140, tempAvailTime[140] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[141] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(141, tempAvailTime[141] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[142] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(142, tempAvailTime[142] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[143] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(143, tempAvailTime[143] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[144] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(144, tempAvailTime[144] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[145] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(145, tempAvailTime[145] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[146] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(146, tempAvailTime[146] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>9-10 PM</td>
                                <td><button className={tempAvailTime[147] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(147, tempAvailTime[147] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[148] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(148, tempAvailTime[148] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[149] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(149, tempAvailTime[149] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[150] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(150, tempAvailTime[150] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[151] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(151, tempAvailTime[151] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[152] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(152, tempAvailTime[152] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[153] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(153, tempAvailTime[153] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>10-11 PM</td>
                                <td><button className={tempAvailTime[154] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(154, tempAvailTime[154] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[155] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(155, tempAvailTime[155] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[156] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(156, tempAvailTime[156] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[157] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(157, tempAvailTime[157] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[158] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(158, tempAvailTime[158] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[159] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(159, tempAvailTime[159] === '1' ? true : false)}></button></td>
                                <td><button className={tempAvailTime[160] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(160, tempAvailTime[160] === '1' ? true : false)}></button></td>
                            </tr>
                            <tr>
                            <td className={PPMod.text}>11 PM - 12 AM</td>
                            <td><button className={tempAvailTime[161] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(161, tempAvailTime[161] === '1' ? true : false)}></button></td>
                            <td><button className={tempAvailTime[162] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(162, tempAvailTime[162] === '1' ? true : false)}></button></td>
                            <td><button className={tempAvailTime[163] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(163, tempAvailTime[163] === '1' ? true : false)}></button></td>
                            <td><button className={tempAvailTime[164] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(164, tempAvailTime[164] === '1' ? true : false)}></button></td>
                            <td><button className={tempAvailTime[165] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(165, tempAvailTime[165] === '1' ? true : false)}></button></td>
                            <td><button className={tempAvailTime[166] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(166, tempAvailTime[166] === '1' ? true : false)}></button></td>
                            <td><button className={tempAvailTime[167] === '1' ? EPMod.green : EPMod.red} onClick={() => boxCheck(167, tempAvailTime[167] === '1' ? true : false)}></button></td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>


                <div className={EPMod.subcontainer}>
                    <button type="submit">Update Profile</button>

                    <button type="button" onClick = {changePassword}>Change Password</button>
                    {/* <button type="button" onClick = {deleteAccount}>Delete Account</button> */}
                    
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

            {/* {showDeletePopup && (
                <div className={EPMod.popup}>
                    <p>Are you sure you want to delete your account?</p>
                    <button>Yes</button>
                    <button>No</button>
                </div>
            )} */}
            
        </div>
    );  
}