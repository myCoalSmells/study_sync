import React, { useEffect } from "react";
import LPMod from "./LoginPage.module.css";
import { Link, useNavigate } from 'react-router-dom'
import { auth } from "./firebase-setup/firebase";


export default function LogoutPage() {
    const navigate = useNavigate();
    useEffect(() => {
        auth.signOut().then(function() {
            console.log('Signed Out');
        }, function(error) {
            console.error('Sign Out Error', error);
        });
    });
    return (
        <div className={LPMod.login}>
        <h1>You have been logged out.</h1>
        <div>
            <button onClick={() => navigate('/login')} type="submit" >Login</button>
        </div>
        </div>
    )
}