import React from "react";
import Header from './Header';
import "./App.css";
import ProfileCards from "./ProfileCards";
import FirebaseTest from "./FirebaseTest";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/chat" element={<h1>i am chat page</h1>}/>
          <Route path="/" element={<h1><ProfileCards /></h1>}/>
          <Route path="/fbtest" element={<h1><FirebaseTest /></h1>}/>
        </Routes>
      </Router>   
    </div>
  )
}

export default App;
