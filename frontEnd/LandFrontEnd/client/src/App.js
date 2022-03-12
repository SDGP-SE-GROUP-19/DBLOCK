import React, { Component } from "react";
import "./App.css";
import AdminNavigator from "./components/AdminNavigator";
import AdminSignIn from "./components/AdminSignIn";

class App extends Component {

  render() {

    return (
      <div className="App">

        {/* <AdminNavigator /> */}

        <AdminSignIn />

      </div>
    );
  }
}

export default App;
