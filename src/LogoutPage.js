import React from "react";
import LPMod from "./LoginPage.module.css";

export default function LogoutPage() {
    return (
        <div className={LPMod.login}>
        <h1>You have been logged out.</h1>
        <div>
            <button type="submit">Login</button>
        </div>
        <div>
            <button type="submit">Return to Homepage</button>
        </div>
        </div>
    )
}