import React from "react";
import Header from './Header';
import APMod from "./App.module.css";
import ProfileCards from "./ProfileCards";
import ProfilePage from "./ProfilePage";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import SignupPage from "./SignupPage";
import EditProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";
import Inbox from "./Inbox";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Advanced from "./Advanced";

function App() {
  const location = useLocation();

  return (
    <div className={APMod.App}>
      {['/', '/profile', '/inbox', '/editprofile'].includes(location.pathname) && <Header />}
      {['/login', '/logout', '/signup'].includes(location.pathname) && <img style={{ display: "block", margin: "0 auto", width: "15%", padding: "10px" }} src="https://i.imgur.com/YYEsYzY.png"/>}
      <div className="app__wrapper">
        <Routes>
          <Route path="/inbox" element={<h1><Inbox /></h1>}/>
          <Route path="/profile" element={<h1><ProfilePage /></h1>}/>
          <Route path="/profile/:userId" element={<h1><ViewProfile /></h1>}/>
          <Route path="/login" element={<h1><LoginPage /></h1>}/>
          <Route path="/logout" element={<h1><LogoutPage /></h1>}/>
          <Route path="/signup" element={<h1><SignupPage /></h1>}/>
          <Route path="/" element={<h1><ProfileCards /></h1>}/>
          <Route path="/editprofile" element={<h1><EditProfile /></h1>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App;
