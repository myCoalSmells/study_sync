import React, {useState} from "react";
import {Link} from "react-router-dom";
import LPMod from "./LoginPage.module.css";
import handleSubmit from "./firebase-setup/handlesubmit";
import { useRef } from "react";
import { auth } from "./firebase-setup/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {

        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) =>{
            console.log(userCredential);
            console.log("sign in!");
        })
        .catch((error) => {
            console.log(error);
            console.log("no sign in");
        })
    }
    return (
        <div className={LPMod.login}>
        <h1>Login to StudySync</h1>
        <form onSubmit={signIn}>
            <label>
                <p>Username</p>
                <input type="text" 
                onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <div>
            </div>
            <label>
                <p>Password</p>
                <input type="password" 
                onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <div className={LPMod.container}>
                <button type="submit">Login</button>
            </div>
            <div className={LPMod.container}>
                <button type="submit">Forgot username or password?</button>
            </div>
            <div className={LPMod.login}>
                <h1>Don't have an account?</h1>
                <Link to="/signup">
                <button type="submit">Sign Up</button>
                </Link>
            </div>
            </form>
        </div>
    )
}