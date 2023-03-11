import React, { useState } from 'react';
import LPMod from "./LoginPage.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-setup/firebase"

export default function SignupPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
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
                <input type="url" />
            </label>
            <div className={LPMod.container}>
                <button type="submit">Sign Up</button>
            </div>
            </form>
        </div>
    )
}