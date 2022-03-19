import React, { Component } from "react";
import "./App.css";
import AdminNavigator from "./components/AdminNavigator";
import LawyerSignUp from "./components/LawyerSignUp";

class App extends Component {

  render() {

    return (
      <>
      <div className="header">

      {/* <AdminNavigator /> */}

      <LawyerSignUp />

      </div>
      
        <div className="footer">
          <p>Developed by <b>INNOVSOLVES</b> | Contact us :<b>+94*********</b></p>
        </div>
        
        </>
      );
  }
}

export default App;
