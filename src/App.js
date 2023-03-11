import React from "react";
import Header from './Header';
import APMod from "./App.module.css";
import ProfileCards from "./ProfileCards";
import ProfilePage from "./ProfilePage";
import LoginPage from "./LoginPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Advanced from "./Advanced";

function App() {
  return (
    <div className={APMod.App}>
      <Header />
      <Routes>
        <Route path="/chat" element={<h1>I am chat page</h1>}/>
        <Route path="/profile" element={<h1><ProfilePage /></h1>}/>
        <Route path="/login" element={<h1><LoginPage /></h1>}/>
        <Route path="/" element={<h1><ProfileCards /></h1>}/>
        <Route path="/test" element={<h1><Advanced /></h1>}/>
      </Routes>
    </div>
  )
}

export default App;
