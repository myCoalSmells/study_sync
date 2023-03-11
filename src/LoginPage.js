import React from "react";
import {Link} from "react-router-dom";
import LPMod from "./LoginPage.module.css";
import handleSubmit from "./firebase-setup/handlesubmit";
import { useRef } from "react";

export default function LoginPage() {
    const dataRef = useRef()

    const submithandler = (e) => {
        e.preventDefault()
        handleSubmit(dataRef.current.value)
        dataRef.current.value = ""
        console.log('submitted')
    }
    return (
        <div className={LPMod.login}>
        <h1>Login to StudySync</h1>
        <form onSubmit={submithandler}>
            <label>
                <p>Username</p>
                <input type="text" ref={dataRef} />
            </label>
            <div>
            </div>
            <label>
                <p>Password</p>
                <input type="password" />
            </label>
            <div className={LPMod.container}>
                <button type="submit">Login</button>
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