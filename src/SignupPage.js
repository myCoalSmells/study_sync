import React, { useState } from 'react';
import LPMod from "./LoginPage.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";
import { auth, firestore } from "./firebase-setup/firebase"
import {Link} from "react-router-dom";



export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState("");
    const [course, setCourse] = useState("");
    const [myCourses, setCourses] = useState([]);



    //const colRef = collection(firestore, "students");

    const signUp = (e) => {
        if (username.length === 0 || email.length === 0 || myCourses.length === 0 ||
            password.length === 0){
            alert("one or more empty fields");
            return;
        }
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            const user = auth.currentUser;

            setDoc(doc(firestore, "students", user.uid), {
                username: username,
                email: email,
                pfp: pic,
                key: user.uid,
                classes: myCourses.map(course => course.name)
            });

            //console.log(user.uid);
            alert("Success!");
        })
        .catch((error) => {
            alert("Invalid email and/or password");
            console.log(error);
        });
    };

    return (
        <div className={LPMod.login}>
        <h1>Create an Account</h1>
        <form onSubmit={signUp}>
            <label>
                <p>Username</p>
                <input type="text" 
                onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <div>
            </div>
            <label>
                <p>Email</p>
                <input type="text"
                onChange={(e) => setEmail(e.target.value)}
                 />
            </label>
            <div>
            </div>
            <label>
                <p>Password</p>
                <input type="password" 
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <div>
            </div>
            <label>
                <p>Profile Picture (URL)</p>
                <input type="url"
                onChange={(e) => setPic(e.target.value)}
                />
            </label>
            <div>
            </div>
            <label>
                <p>Classes</p>
                <input value = {course}
                onChange={e => setCourse(e.target.value)}
                />
            </label>
            <button type="button" onClick = {()=>{
            if (course === ""){
                alert("Empty course name!");
                return;
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
            setCourses([...myCourses, {name: course.replace(/\s/g, "").toUpperCase()}]);}
            }> Add Class</button>
            <ol>
                {myCourses.map(course => <li key={course.name}>{course.name}</li>)}
            </ol>
            <div className={LPMod.container}>
            {/* NEED VALIDITY CHECK*/}
                <Link to="/"> 
                    <button type="submit">Sign Up</button>
                </Link>
            </div>

            </form>
        </div>
    )
}