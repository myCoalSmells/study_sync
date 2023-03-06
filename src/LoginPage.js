import React from "react";
import LPMod from "./LoginPage.module.css";

export default function LoginPage() {
    return (
        <div className={LPMod.login}>
        <h1>Login to StudySync</h1>
        <form>
            <label>
                <p>Username</p>
                <input type="text" />
            </label>
            <label>
                <p>Password</p>
                <input type="password" />
            </label>
            <h1>Don't have an account?</h1>
            <div>
                <button type="submit">Sign Up</button>
            </div>
            </form>
        </div>
    )
}