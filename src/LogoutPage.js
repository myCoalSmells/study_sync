import React from "react";
import {Link} from "react-router-dom";
import LPMod from "./LoginPage.module.css";

export default function LogoutPage() {
    return (
        <div className={LPMod.login}>
        <h1>You have been logged out.</h1>
        <div className={LPMod.container}>
        <Link to="/login">
            <button type="submit">Login</button>
        </Link>
        </div>
        <div>
        <Link to="/">
            <button type="submit">Return to Homepage</button>
        </Link>
        </div>
        </div>
    )
}