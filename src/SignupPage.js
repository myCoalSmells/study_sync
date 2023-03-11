import React from 'react';
import LPMod from "./LoginPage.module.css";

export default function SignupPage() {
    return (
        <div className={LPMod.login}>
        <h1>Create an Account</h1>
        <form>
            <label>
                <p>Username</p>
                <input type="text" />
            </label>
            <div>
            </div>
            <label>
                <p>Password</p>
                <input type="password" />
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