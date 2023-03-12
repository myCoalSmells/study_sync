import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

// css modules
import EPMod from "./EditProfile.module.css";
import PPMod from "./ProfilePage.module.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditProfile() {
    // for now, this is a temporary way to change data
    // change this to use firebase
    // Student is the name of the object used in the displaying of the data
    let Student = {
        name: 'Michael Liu',
        pfp: "https://i.imgur.com/pkpvLJn.jpeg",
        classMatch: "CS 35L, Math 33B, Physics 1C",
        availTime: "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        contactInfo: "myemail@yahoo.com"  
    };


    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [classMatch, setClassMatch] = useState('');
    const [availTime, setAvailTime] = useState('');
    const [pfp, setPFP] = useState('');

    //popup (separate from others)
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setName(Student.name);
        setContactInfo(Student.contactInfo);
        setClassMatch(Student.classMatch);
        setAvailTime(Student.availTime);
        setPFP(Student.pfp)
    }, []);

    // in here, add a function to update student object in the database, instead of Navigate
    // add validation for uder input (correct format)

    const handleSubmit = (e) => {
        e.preventDefault();
        // check validity
        
        // update student object inside the database (new data are in these variables)
        // use effect above sets the variables.
        Student.name = name;
        Student.availTime = availTime;
        Student.contactInfo = contactInfo;
        Student.pfp = pfp;
        Student.classMatch = classMatch;

        // popup code
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 2300);
    };

    // checkbox check
    const handleCheck = (isChecked, index, e) => {
        const availTimeArr = availTime.split('');
        if (isChecked) {
          availTimeArr[index] = '1';
        } else {
          availTimeArr[index] = '0';
        }
        const updatedAvailTimeArr = availTimeArr.join('');
        setAvailTime(updatedAvailTimeArr);
        console.log(index, " is pressed");
    };

    return(
        <div>
            
            <form onSubmit={handleSubmit} className={EPMod.container}>
                <div className={EPMod.subcontainer}>
                    <label htmlFor="pfp">Profile Picture:</label>
                    <input type="text" id="pfp" value={pfp} onChange={(e) => setPFP(e.target.value)} />
                </div>
                
                <div className={EPMod.subcontainer}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className={EPMod.subcontainer}>
                    <label htmlFor="contactInfo">Contact Info:</label>
                    <input type="text" id="contactInfo" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
                </div>
                
                <div className={EPMod.subcontainer}>
                    <label htmlFor="classMatch">Class Match:</label>
                    <input type="text" id="classMatch" value={classMatch} onChange={(e) => setClassMatch(e.target.value)} />
                </div>
                
                <div className={EPMod.subcontainer}>
                    <label htmlFor="availTime">Available Times:</label>
                    <textarea value={availTime} readOnly={true} style={{fontSize: "16px"}}/>
                </div>
                <div className={PPMod.container}>
                    <table>
                        <thead>
                            <tr>
                                <th className={PPMod.text}>Time</th>
                                <th className={PPMod.text}>Sun</th>
                                <th className={PPMod.text}>Mon</th>
                                <th className={PPMod.text}>Tue</th>
                                <th className={PPMod.text}>Wed</th>
                                <th className={PPMod.text}>Thu</th>
                                <th className={PPMod.text}>Fri</th>
                                <th className={PPMod.text}>Sat</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={PPMod.text}>12-1 AM</td>
                                <td><input type="checkbox" checked={availTime[0] === '1'} onChange={(e) => handleCheck(e.target.checked, 0)} /></td>
                                <td><input type="checkbox" checked={availTime[1] === '1'} onChange={(e) => handleCheck(e.target.checked, 1)} /></td>
                                <td><input type="checkbox" checked={availTime[2] === '1'} onChange={(e) => handleCheck(e.target.checked, 2)} /></td>
                                <td><input type="checkbox" checked={availTime[3] === '1'} onChange={(e) => handleCheck(e.target.checked, 3)} /></td>
                                <td><input type="checkbox" checked={availTime[4] === '1'} onChange={(e) => handleCheck(e.target.checked, 4)} /></td>
                                <td><input type="checkbox" checked={availTime[5] === '1'} onChange={(e) => handleCheck(e.target.checked, 5)} /></td>
                                <td><input type="checkbox" checked={availTime[6] === '1'} onChange={(e) => handleCheck(e.target.checked, 6)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>1-2 AM</td>
                                <td><input type="checkbox" checked={availTime[7] === '1'} onChange={(e) => handleCheck(e.target.checked, 7)} /></td>
                                <td><input type="checkbox" checked={availTime[8] === '1'} onChange={(e) => handleCheck(e.target.checked, 8)} /></td>
                                <td><input type="checkbox" checked={availTime[9] === '1'} onChange={(e) => handleCheck(e.target.checked, 9)} /></td>
                                <td><input type="checkbox" checked={availTime[10] === '1'} onChange={(e) => handleCheck(e.target.checked, 10)} /></td>
                                <td><input type="checkbox" checked={availTime[11] === '1'} onChange={(e) => handleCheck(e.target.checked, 11)} /></td>
                                <td><input type="checkbox" checked={availTime[12] === '1'} onChange={(e) => handleCheck(e.target.checked, 12)} /></td>
                                <td><input type="checkbox" checked={availTime[13] === '1'} onChange={(e) => handleCheck(e.target.checked, 13)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>2-3 AM</td>
                                <td><input type="checkbox" checked={availTime[14] === '1'} onChange={(e) => handleCheck(e.target.checked, 14)} /></td>
                                <td><input type="checkbox" checked={availTime[15] === '1'} onChange={(e) => handleCheck(e.target.checked, 15)} /></td>
                                <td><input type="checkbox" checked={availTime[16] === '1'} onChange={(e) => handleCheck(e.target.checked, 16)} /></td>
                                <td><input type="checkbox" checked={availTime[17] === '1'} onChange={(e) => handleCheck(e.target.checked, 17)} /></td>
                                <td><input type="checkbox" checked={availTime[18] === '1'} onChange={(e) => handleCheck(e.target.checked, 18)} /></td>
                                <td><input type="checkbox" checked={availTime[19] === '1'} onChange={(e) => handleCheck(e.target.checked, 19)} /></td>
                                <td><input type="checkbox" checked={availTime[20] === '1'} onChange={(e) => handleCheck(e.target.checked, 20)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>3-4 AM</td>
                                <td><input type="checkbox" checked={availTime[21] === '1'} onChange={(e) => handleCheck(e.target.checked, 21)} /></td>
                                <td><input type="checkbox" checked={availTime[22] === '1'} onChange={(e) => handleCheck(e.target.checked, 22)} /></td>
                                <td><input type="checkbox" checked={availTime[23] === '1'} onChange={(e) => handleCheck(e.target.checked, 23)} /></td>
                                <td><input type="checkbox" checked={availTime[24] === '1'} onChange={(e) => handleCheck(e.target.checked, 24)} /></td>
                                <td><input type="checkbox" checked={availTime[25] === '1'} onChange={(e) => handleCheck(e.target.checked, 25)} /></td>
                                <td><input type="checkbox" checked={availTime[26] === '1'} onChange={(e) => handleCheck(e.target.checked, 26)} /></td>
                                <td><input type="checkbox" checked={availTime[27] === '1'} onChange={(e) => handleCheck(e.target.checked, 27)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>4-5 AM</td>
                                <td><input type="checkbox" checked={availTime[28] === '1'} onChange={(e) => handleCheck(e.target.checked, 28)} /></td>
                                <td><input type="checkbox" checked={availTime[29] === '1'} onChange={(e) => handleCheck(e.target.checked, 29)} /></td>
                                <td><input type="checkbox" checked={availTime[30] === '1'} onChange={(e) => handleCheck(e.target.checked, 30)} /></td>
                                <td><input type="checkbox" checked={availTime[31] === '1'} onChange={(e) => handleCheck(e.target.checked, 31)} /></td>
                                <td><input type="checkbox" checked={availTime[32] === '1'} onChange={(e) => handleCheck(e.target.checked, 32)} /></td>
                                <td><input type="checkbox" checked={availTime[33] === '1'} onChange={(e) => handleCheck(e.target.checked, 33)} /></td>
                                <td><input type="checkbox" checked={availTime[34] === '1'} onChange={(e) => handleCheck(e.target.checked, 34)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>5-6 AM</td>
                                <td><input type="checkbox" checked={availTime[35] === '1'} onChange={(e) => handleCheck(e.target.checked, 35)} /></td>
                                <td><input type="checkbox" checked={availTime[36] === '1'} onChange={(e) => handleCheck(e.target.checked, 36)} /></td>
                                <td><input type="checkbox" checked={availTime[37] === '1'} onChange={(e) => handleCheck(e.target.checked, 37)} /></td>
                                <td><input type="checkbox" checked={availTime[38] === '1'} onChange={(e) => handleCheck(e.target.checked, 38)} /></td>
                                <td><input type="checkbox" checked={availTime[39] === '1'} onChange={(e) => handleCheck(e.target.checked, 39)} /></td>
                                <td><input type="checkbox" checked={availTime[40] === '1'} onChange={(e) => handleCheck(e.target.checked, 40)} /></td>
                                <td><input type="checkbox" checked={availTime[41] === '1'} onChange={(e) => handleCheck(e.target.checked, 41)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>6-7 AM</td>
                                <td><input type="checkbox" checked={availTime[42] === '1'} onChange={(e) => handleCheck(e.target.checked, 42)} /></td>
                                <td><input type="checkbox" checked={availTime[43] === '1'} onChange={(e) => handleCheck(e.target.checked, 43)} /></td>
                                <td><input type="checkbox" checked={availTime[44] === '1'} onChange={(e) => handleCheck(e.target.checked, 44)} /></td>
                                <td><input type="checkbox" checked={availTime[45] === '1'} onChange={(e) => handleCheck(e.target.checked, 45)} /></td>
                                <td><input type="checkbox" checked={availTime[46] === '1'} onChange={(e) => handleCheck(e.target.checked, 46)} /></td>
                                <td><input type="checkbox" checked={availTime[47] === '1'} onChange={(e) => handleCheck(e.target.checked, 47)} /></td>
                                <td><input type="checkbox" checked={availTime[48] === '1'} onChange={(e) => handleCheck(e.target.checked, 48)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>7-8 AM</td>
                                <td><input type="checkbox" checked={availTime[49] === '1'} onChange={(e) => handleCheck(e.target.checked, 49)} /></td>
                                <td><input type="checkbox" checked={availTime[50] === '1'} onChange={(e) => handleCheck(e.target.checked, 50)} /></td>
                                <td><input type="checkbox" checked={availTime[51] === '1'} onChange={(e) => handleCheck(e.target.checked, 51)} /></td>
                                <td><input type="checkbox" checked={availTime[52] === '1'} onChange={(e) => handleCheck(e.target.checked, 52)} /></td>
                                <td><input type="checkbox" checked={availTime[53] === '1'} onChange={(e) => handleCheck(e.target.checked, 53)} /></td>
                                <td><input type="checkbox" checked={availTime[54] === '1'} onChange={(e) => handleCheck(e.target.checked, 54)} /></td>
                                <td><input type="checkbox" checked={availTime[55] === '1'} onChange={(e) => handleCheck(e.target.checked, 55)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>8-9 AM</td>
                                <td><input type="checkbox" checked={availTime[56] === '1'} onChange={(e) => handleCheck(e.target.checked, 56)} /></td>
                                <td><input type="checkbox" checked={availTime[57] === '1'} onChange={(e) => handleCheck(e.target.checked, 57)} /></td>
                                <td><input type="checkbox" checked={availTime[58] === '1'} onChange={(e) => handleCheck(e.target.checked, 58)} /></td>
                                <td><input type="checkbox" checked={availTime[59] === '1'} onChange={(e) => handleCheck(e.target.checked, 59)} /></td>
                                <td><input type="checkbox" checked={availTime[60] === '1'} onChange={(e) => handleCheck(e.target.checked, 60)} /></td>
                                <td><input type="checkbox" checked={availTime[61] === '1'} onChange={(e) => handleCheck(e.target.checked, 61)} /></td>
                                <td><input type="checkbox" checked={availTime[62] === '1'} onChange={(e) => handleCheck(e.target.checked, 62)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>9-10 AM</td>
                                <td><input type="checkbox" checked={availTime[63] === '1'} onChange={(e) => handleCheck(e.target.checked, 63)} /></td>
                                <td><input type="checkbox" checked={availTime[64] === '1'} onChange={(e) => handleCheck(e.target.checked, 64)} /></td>
                                <td><input type="checkbox" checked={availTime[65] === '1'} onChange={(e) => handleCheck(e.target.checked, 65)} /></td>
                                <td><input type="checkbox" checked={availTime[66] === '1'} onChange={(e) => handleCheck(e.target.checked, 66)} /></td>
                                <td><input type="checkbox" checked={availTime[67] === '1'} onChange={(e) => handleCheck(e.target.checked, 67)} /></td>
                                <td><input type="checkbox" checked={availTime[68] === '1'} onChange={(e) => handleCheck(e.target.checked, 68)} /></td>
                                <td><input type="checkbox" checked={availTime[69] === '1'} onChange={(e) => handleCheck(e.target.checked, 69)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>10-11 AM</td>
                                <td><input type="checkbox" checked={availTime[70] === '1'} onChange={(e) => handleCheck(e.target.checked, 70)} /></td>
                                <td><input type="checkbox" checked={availTime[71] === '1'} onChange={(e) => handleCheck(e.target.checked, 71)} /></td>
                                <td><input type="checkbox" checked={availTime[72] === '1'} onChange={(e) => handleCheck(e.target.checked, 72)} /></td>
                                <td><input type="checkbox" checked={availTime[73] === '1'} onChange={(e) => handleCheck(e.target.checked, 73)} /></td>
                                <td><input type="checkbox" checked={availTime[74] === '1'} onChange={(e) => handleCheck(e.target.checked, 74)} /></td>
                                <td><input type="checkbox" checked={availTime[75] === '1'} onChange={(e) => handleCheck(e.target.checked, 75)} /></td>
                                <td><input type="checkbox" checked={availTime[76] === '1'} onChange={(e) => handleCheck(e.target.checked, 76)} /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>11 AM - 12 PM</td>
                                <td><input type="checkbox" checked={availTime[77] === '1'} onChange={(e) => handleCheck(e.target.checked, 77)} /></td>
                                <td><input type="checkbox" checked={availTime[78] === '1'} onChange={(e) => handleCheck(e.target.checked, 78)} /></td>
                                <td><input type="checkbox" checked={availTime[79] === '1'} onChange={(e) => handleCheck(e.target.checked, 79)} /></td>
                                <td><input type="checkbox" checked={availTime[80] === '1'} onChange={(e) => handleCheck(e.target.checked, 80)} /></td>
                                <td><input type="checkbox" checked={availTime[81] === '1'} onChange={(e) => handleCheck(e.target.checked, 81)} /></td>
                                <td><input type="checkbox" checked={availTime[82] === '1'} onChange={(e) => handleCheck(e.target.checked, 82)} /></td>
                                <td><input type="checkbox" checked={availTime[83] === '1'} onChange={(e) => handleCheck(e.target.checked, 83)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>12-1 PM</td>
                                <td><input type="checkbox" checked={availTime[84] === '1'} onChange={(e) => handleCheck(e.target.checked, 84)} /></td>
                                <td><input type="checkbox" checked={availTime[85] === '1'} onChange={(e) => handleCheck(e.target.checked, 85)} /></td>
                                <td><input type="checkbox" checked={availTime[86] === '1'} onChange={(e) => handleCheck(e.target.checked, 86)} /></td>
                                <td><input type="checkbox" checked={availTime[87] === '1'} onChange={(e) => handleCheck(e.target.checked, 87)} /></td>
                                <td><input type="checkbox" checked={availTime[88] === '1'} onChange={(e) => handleCheck(e.target.checked, 88)} /></td>
                                <td><input type="checkbox" checked={availTime[89] === '1'} onChange={(e) => handleCheck(e.target.checked, 89)} /></td>
                                <td><input type="checkbox" checked={availTime[90] === '1'} onChange={(e) => handleCheck(e.target.checked, 90)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>1-2 PM</td>
                                <td><input type="checkbox" checked={availTime[91] === '1'} onChange={(e) => handleCheck(e.target.checked, 91)} /></td>
                                <td><input type="checkbox" checked={availTime[92] === '1'} onChange={(e) => handleCheck(e.target.checked, 92)} /></td>
                                <td><input type="checkbox" checked={availTime[93] === '1'} onChange={(e) => handleCheck(e.target.checked, 93)} /></td>
                                <td><input type="checkbox" checked={availTime[94] === '1'} onChange={(e) => handleCheck(e.target.checked, 94)} /></td>
                                <td><input type="checkbox" checked={availTime[95] === '1'} onChange={(e) => handleCheck(e.target.checked, 95)} /></td>
                                <td><input type="checkbox" checked={availTime[96] === '1'} onChange={(e) => handleCheck(e.target.checked, 96)} /></td>
                                <td><input type="checkbox" checked={availTime[97] === '1'} onChange={(e) => handleCheck(e.target.checked, 97)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>2-3 PM</td>
                                <td><input type="checkbox" checked={availTime[98] === '1'} onChange={(e) => handleCheck(e.target.checked, 98)} /></td>
                                <td><input type="checkbox" checked={availTime[99] === '1'} onChange={(e) => handleCheck(e.target.checked, 99)} /></td>
                                <td><input type="checkbox" checked={availTime[100] === '1'} onChange={(e) => handleCheck(e.target.checked, 100)} /></td>
                                <td><input type="checkbox" checked={availTime[101] === '1'} onChange={(e) => handleCheck(e.target.checked, 101)} /></td>
                                <td><input type="checkbox" checked={availTime[102] === '1'} onChange={(e) => handleCheck(e.target.checked, 102)} /></td>
                                <td><input type="checkbox" checked={availTime[103] === '1'} onChange={(e) => handleCheck(e.target.checked, 103)} /></td>
                                <td><input type="checkbox" checked={availTime[104] === '1'} onChange={(e) => handleCheck(e.target.checked, 104)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>3-4 PM</td>
                                <td><input type="checkbox" checked={availTime[105] === '1'} onChange={(e) => handleCheck(e.target.checked, 105)} /></td>
                                <td><input type="checkbox" checked={availTime[106] === '1'} onChange={(e) => handleCheck(e.target.checked, 106)} /></td>
                                <td><input type="checkbox" checked={availTime[107] === '1'} onChange={(e) => handleCheck(e.target.checked, 107)} /></td>
                                <td><input type="checkbox" checked={availTime[108] === '1'} onChange={(e) => handleCheck(e.target.checked, 108)} /></td>
                                <td><input type="checkbox" checked={availTime[109] === '1'} onChange={(e) => handleCheck(e.target.checked, 109)} /></td>
                                <td><input type="checkbox" checked={availTime[110] === '1'} onChange={(e) => handleCheck(e.target.checked, 110)} /></td>
                                <td><input type="checkbox" checked={availTime[111] === '1'} onChange={(e) => handleCheck(e.target.checked, 111)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>4-5 PM</td>
                                <td><input type="checkbox" checked={availTime[112] === '1'} onChange={(e) => handleCheck(e.target.checked, 112)} /></td>
                                <td><input type="checkbox" checked={availTime[113] === '1'} onChange={(e) => handleCheck(e.target.checked, 113)} /></td>
                                <td><input type="checkbox" checked={availTime[114] === '1'} onChange={(e) => handleCheck(e.target.checked, 114)} /></td>
                                <td><input type="checkbox" checked={availTime[115] === '1'} onChange={(e) => handleCheck(e.target.checked, 115)} /></td>
                                <td><input type="checkbox" checked={availTime[116] === '1'} onChange={(e) => handleCheck(e.target.checked, 116)} /></td>
                                <td><input type="checkbox" checked={availTime[117] === '1'} onChange={(e) => handleCheck(e.target.checked, 117)} /></td>
                                <td><input type="checkbox" checked={availTime[118] === '1'} onChange={(e) => handleCheck(e.target.checked, 118)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>5-6 PM</td>
                                <td><input type="checkbox" checked={availTime[119] === '1'} onChange={(e) => handleCheck(e.target.checked, 119)} /></td>
                                <td><input type="checkbox" checked={availTime[120] === '1'} onChange={(e) => handleCheck(e.target.checked, 120)} /></td>
                                <td><input type="checkbox" checked={availTime[121] === '1'} onChange={(e) => handleCheck(e.target.checked, 121)} /></td>
                                <td><input type="checkbox" checked={availTime[122] === '1'} onChange={(e) => handleCheck(e.target.checked, 122)} /></td>
                                <td><input type="checkbox" checked={availTime[123] === '1'} onChange={(e) => handleCheck(e.target.checked, 123)} /></td>
                                <td><input type="checkbox" checked={availTime[124] === '1'} onChange={(e) => handleCheck(e.target.checked, 124)} /></td>
                                <td><input type="checkbox" checked={availTime[125] === '1'} onChange={(e) => handleCheck(e.target.checked, 125)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>6-7 PM</td>
                                <td><input type="checkbox" checked={availTime[126] === '1'} onChange={(e) => handleCheck(e.target.checked, 126)} /></td>
                                <td><input type="checkbox" checked={availTime[127] === '1'} onChange={(e) => handleCheck(e.target.checked, 127)} /></td>
                                <td><input type="checkbox" checked={availTime[128] === '1'} onChange={(e) => handleCheck(e.target.checked, 128)} /></td>
                                <td><input type="checkbox" checked={availTime[129] === '1'} onChange={(e) => handleCheck(e.target.checked, 129)} /></td>
                                <td><input type="checkbox" checked={availTime[130] === '1'} onChange={(e) => handleCheck(e.target.checked, 130)} /></td>
                                <td><input type="checkbox" checked={availTime[131] === '1'} onChange={(e) => handleCheck(e.target.checked, 131)} /></td>
                                <td><input type="checkbox" checked={availTime[132] === '1'} onChange={(e) => handleCheck(e.target.checked, 132)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>7-8 PM</td>
                                <td><input type="checkbox" checked={availTime[133] === '1'} onChange={(e) => handleCheck(e.target.checked, 133)} /></td>
                                <td><input type="checkbox" checked={availTime[134] === '1'} onChange={(e) => handleCheck(e.target.checked, 134)} /></td>
                                <td><input type="checkbox" checked={availTime[135] === '1'} onChange={(e) => handleCheck(e.target.checked, 135)} /></td>
                                <td><input type="checkbox" checked={availTime[136] === '1'} onChange={(e) => handleCheck(e.target.checked, 136)} /></td>
                                <td><input type="checkbox" checked={availTime[137] === '1'} onChange={(e) => handleCheck(e.target.checked, 137)} /></td>
                                <td><input type="checkbox" checked={availTime[138] === '1'} onChange={(e) => handleCheck(e.target.checked, 138)} /></td>
                                <td><input type="checkbox" checked={availTime[139] === '1'} onChange={(e) => handleCheck(e.target.checked, 139)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>8-9 PM</td>
                                <td><input type="checkbox" checked={availTime[140] === '1'} onChange={(e) => handleCheck(e.target.checked, 140)} /></td>
                                <td><input type="checkbox" checked={availTime[141] === '1'} onChange={(e) => handleCheck(e.target.checked, 141)} /></td>
                                <td><input type="checkbox" checked={availTime[142] === '1'} onChange={(e) => handleCheck(e.target.checked, 142)} /></td>
                                <td><input type="checkbox" checked={availTime[143] === '1'} onChange={(e) => handleCheck(e.target.checked, 143)} /></td>
                                <td><input type="checkbox" checked={availTime[144] === '1'} onChange={(e) => handleCheck(e.target.checked, 144)} /></td>
                                <td><input type="checkbox" checked={availTime[145] === '1'} onChange={(e) => handleCheck(e.target.checked, 145)} /></td>
                                <td><input type="checkbox" checked={availTime[146] === '1'} onChange={(e) => handleCheck(e.target.checked, 146)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>9-10 PM</td>
                                <td><input type="checkbox" checked={availTime[147] === '1'} onChange={(e) => handleCheck(e.target.checked, 147)} /></td>
                                <td><input type="checkbox" checked={availTime[148] === '1'} onChange={(e) => handleCheck(e.target.checked, 148)} /></td>
                                <td><input type="checkbox" checked={availTime[149] === '1'} onChange={(e) => handleCheck(e.target.checked, 149)} /></td>
                                <td><input type="checkbox" checked={availTime[150] === '1'} onChange={(e) => handleCheck(e.target.checked, 150)} /></td>
                                <td><input type="checkbox" checked={availTime[151] === '1'} onChange={(e) => handleCheck(e.target.checked, 151)} /></td>
                                <td><input type="checkbox" checked={availTime[152] === '1'} onChange={(e) => handleCheck(e.target.checked, 152)} /></td>
                                <td><input type="checkbox" checked={availTime[153] === '1'} onChange={(e) => handleCheck(e.target.checked, 153)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>10-11 PM</td>
                                <td><input type="checkbox" checked={availTime[154] === '1'} onChange={(e) => handleCheck(e.target.checked, 154)} /></td>
                                <td><input type="checkbox" checked={availTime[155] === '1'} onChange={(e) => handleCheck(e.target.checked, 155)} /></td>
                                <td><input type="checkbox" checked={availTime[156] === '1'} onChange={(e) => handleCheck(e.target.checked, 156)} /></td>
                                <td><input type="checkbox" checked={availTime[157] === '1'} onChange={(e) => handleCheck(e.target.checked, 157)} /></td>
                                <td><input type="checkbox" checked={availTime[158] === '1'} onChange={(e) => handleCheck(e.target.checked, 158)} /></td>
                                <td><input type="checkbox" checked={availTime[159] === '1'} onChange={(e) => handleCheck(e.target.checked, 159)} /></td>
                                <td><input type="checkbox" checked={availTime[160] === '1'} onChange={(e) => handleCheck(e.target.checked, 160)} /></td>
                            </tr>
                            <tr>
                                <td className={PPMod.text}>11 PM - 12 AM</td>
                                <td><input type="checkbox" checked={availTime[161] === '1'} onChange={(e) => handleCheck(e.target.checked, 161)} /></td>
                                <td><input type="checkbox" checked={availTime[162] === '1'} onChange={(e) => handleCheck(e.target.checked, 162)} /></td>
                                <td><input type="checkbox" checked={availTime[163] === '1'} onChange={(e) => handleCheck(e.target.checked, 163)} /></td>
                                <td><input type="checkbox" checked={availTime[164] === '1'} onChange={(e) => handleCheck(e.target.checked, 164)} /></td>
                                <td><input type="checkbox" checked={availTime[165] === '1'} onChange={(e) => handleCheck(e.target.checked, 165)} /></td>
                                <td><input type="checkbox" checked={availTime[166] === '1'} onChange={(e) => handleCheck(e.target.checked, 166)} /></td>
                                <td><input type="checkbox" checked={availTime[167] === '1'} onChange={(e) => handleCheck(e.target.checked, 167)} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={EPMod.subcontainer}>
                    <button type="submit">Update Profile</button>
                    
                    <Link to='/profile'>
                        <Button variant="outline-primary">
                            Back to Profile
                        </Button>
                    </Link>
                </div>
                
            </form>

            {showPopup && (
                <div className={EPMod.popup}>
                    <p>Profile updated successfully!</p>
                </div>
            )}
            
        </div>
    );  
}
