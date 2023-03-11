import React from "react";
import {Link} from "react-router-dom";
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