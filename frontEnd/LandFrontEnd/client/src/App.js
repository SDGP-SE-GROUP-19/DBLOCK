import React, { Component } from "react";
import "./App.css";
import NewDeedForm from "./components/NewDeedForm";
import SearchDeed from "./components/SearchDeed";

class App extends Component {

  render() {

    return (
      <div className="App">

        {/* <NewDeedForm></NewDeedForm> */}

        <SearchDeed></SearchDeed>

      </div>
    );
  }
}

export default App;
