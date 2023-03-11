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
    const colRef = collection(firestore, "students");

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = auth.currentUser;
            setDoc(doc(firestore, "students", user.uid), {
                username: username,
                email: email,
                password: password,
                pfp: pic,
                key: user.uid
            })
            console.log(user.uid);
        })
        .catch((error) => {
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