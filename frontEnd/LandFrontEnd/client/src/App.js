import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css";
import AdminSignIn from "./components/AdminSignIn";
import LawyerSignIn from "./components/LawyerSignIn";

class App extends Component {

  render() {

    return (
      <>
      <div className="header">
      <Router>
        <AdminSignIn />
      </Router>

      </div>
      
        <div className="footer">
          <p>Developed by <b>INNOVSOLVES</b> | Contact us :<b>+94*********</b></p>
        </div>
        
        </>
      );
  }
}

export default App;
