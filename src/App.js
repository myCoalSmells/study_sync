import React from "react";
import Header from './Header'
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/chat" exact>
            <h1> hello chat</h1>
          </Route>
          <Route path="/" exact>
            <h1> I am home page</h1>
          </Route>
        </Routes>
      </Router>   
    </div>
  )
}

export default App;
