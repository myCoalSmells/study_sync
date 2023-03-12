import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

// css modules
import EPMod from "./EditProfile.module.css";
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

    let Student = {
        name: 'Michael Liu',
        pfp: "https://i.imgur.com/pkpvLJn.jpeg",
        classes: ["CS 35L", "Math 33B", "Physics 1C"],
        availTime: "0101001001110000101000101010",
        contactInfo: "myemail@yahoo.com"  
    };



    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [course, setCourse] = useState('');
    const [myCourses, setMyCourses] = useState([]);
    const [availTime, setAvailTime] = useState('');
    const [email, setEmail] = useState("");
    const [pfp, setPFP] = useState('');
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
        Student.availTime = availTime;
        Student.contactInfo = contactInfo;
        Student.pfp = pfp;
        //Student.classMatch = classes;

        // popup code
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 2300);

        const user = auth.currentUser     
        const docRef = doc(firestore, "students", user.uid);
        const docSnap = await getDoc(docRef);
        setLikes(docRef.get())
        setDislikes(docSnap.get("dislikes"));
        setMatches(docSnap.get("matches"));
        let courses =  myCourses.map(course => course.name);
        let uid = user.uid;
        setDoc(doc(firestore, "students", user.uid), {
                username: name,
                email: contactInfo,
                pfp: pfp,
                availTime: availTime,
                classes: courses,
                likes: likes,
                dislikes: dislikes, 
                matches: matches
        });
        console.log("Student profile updated!");
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
                    <input type="text" id="courses" value={course} onChange={(e) => setCourse(e.target.value)} />
                </div>
                
                <div className={EPMod.subcontainer}>
                    <label htmlFor="availTime">Available Times:</label>
                    <input type="text" id="availTime" value={availTime} onChange={(e) => setAvailTime(e.target.value)} />
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
