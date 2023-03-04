import React, { useEffect, useState } from "react";

import PPMod from "./ProfilePage.module.css";


function ProfilePage() {
    const [students, setStudents] = useState([
    {
        name: 'Michael Liu',
        pfp: "https://i.imgur.com/pkpvLJn.jpeg",
        classMatch: "",
        availTime: "",
        contactInfo: ""  
    },
    {
        name: 'Harry Hinman',
        pfp: "https://i.imgur.com/ZAcA6w9.jpeg",
        classMatch: "",
        availTime: "",
        contactInfo: ""
    }
    ]);

    return(
        <div className={PPMod.container}>
            <div className={PPMod.subcontainer}>
                <p className={PPMod.title}>
                    StudentName's Profile
                </p>
                <button>
                    Edit Profile
                </button>
            </div>
            <p>
                Classes: __ , __ , __ , ...
            </p>
            <p>
                Times: Importing a module for this
            </p>
        </div>
    );
}

export default ProfilePage;