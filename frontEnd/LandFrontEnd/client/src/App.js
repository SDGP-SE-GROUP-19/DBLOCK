import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css";
import MainHomePage from "./components/MainHomePage";
//import AdminSignIn from "./components/AdminSignIn";
//import UserSignIn from "./components/UserSignIn";
//import LawyerSignIn from "./components/LawyerSignIn";

class App extends Component {

  render() {

    return (
      <>
      <div className="header">
      <Router>
        {/* <AdminSignIn/> */}
        {/* <LawyerSignIn /> */}
        {/* <UserSignIn /> */}
        <MainHomePage />
      </Router>

      </div>
      
      <div className="footer">
        <p>Copyright &copy; 2022 | Developed by <b>INNOVSOLVES</b> | All Rights Reserved. | Contact us :<b>+94*********</b></p>
      </div>
        
        </>
      );
  }
}

export default App;
