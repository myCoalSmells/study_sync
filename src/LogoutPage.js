import React from "react";
import LPMod from "./LoginPage.module.css";
import { Link, useNavigate } from 'react-router-dom'

export default function LogoutPage() {
    const navigate = useNavigate();
    return (
        <div className={LPMod.login}>
        <h1>You have been logged out.</h1>
        <div>
            <button onClick={() => navigate('/login')} type="submit" >Login</button>
        </div>
        </div>
    )
}