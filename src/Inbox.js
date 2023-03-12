import React from "react";
import Card from "react-bootstrap/Card";
import IMod from "./Inbox.module.css";
  
export default function Inbox() {
    return (
        <div className={IMod.inbox}>
            <h1>INBOX</h1>
            <div className={IMod.container}>
                <h1>(3 new)</h1>
            </div>
        <div className={IMod.inbox}>
        <Card stype={{width: '20rem'}}>
            <Card.Body>
            <Card.Title>Bob Smith</Card.Title>
            <Card.Subtitle>Email: bobsmith@gmail.com</Card.Subtitle>
            <img src={"https://i.imgur.com/FRK6meX.png"} width={300} height={300}/>
            <Card.Text>Matched Class(es): CS35L</Card.Text>
            </Card.Body>
        </Card>        
        </div>
        <div className={IMod.inbox}>
        <Card stype={{width: '20rem'}}>
            <Card.Body>
            <Card.Title>Bob Smith</Card.Title>
            <Card.Subtitle>Email: bobsmith@gmail.com</Card.Subtitle>
            <img src={"https://i.imgur.com/FRK6meX.png"} width={300} height={300}/>
            <Card.Text>Matched Class(es): CS35L</Card.Text>
            </Card.Body>
        </Card>
        </div>
        <div className={IMod.inbox}>
        <Card stype={{width: '20rem'}}>
            <Card.Body>
            <Card.Title>Bob Smith</Card.Title>
            <Card.Subtitle>Email: bobsmith@gmail.com</Card.Subtitle>
            <img src={"https://i.imgur.com/FRK6meX.png"} width={300} height={300}/>
            <Card.Text>Matched Class(es): CS35L</Card.Text>
            </Card.Body>
        </Card>
        </div>
        </div>
    );
}