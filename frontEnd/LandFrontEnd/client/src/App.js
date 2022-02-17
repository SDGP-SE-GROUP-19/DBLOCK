import React, { Component } from "react";
import LandContract from "./contracts/Land.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  state = {

    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    newNo: "",
    newStreetName: "",
    newCity: "",
    newDistrict: "",
    newProvince: "",
    newAssignedLawyerId: 0,
    newAssignedSellerId: 0
  };

  componentDidMount = async () => {

    try {

      // Binding for scope
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleNumberChange = this.handleNumberChange.bind(this);
      this.handleStreetChange = this.handleStreetChange.bind(this);
      this.handleCityChange = this.handleCityChange.bind(this);
      this.handleDistrictChange = this.handleDistrictChange.bind(this);
      this.handleProvinceChange = this.handleProvinceChange.bind(this);
      this.handleLawyerIdChange = this.handleLawyerIdChange.bind(this);
      this.handleSellerIdChange = this.handleSellerIdChange.bind(this);

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LandContract.networks[networkId];
      const instance = new web3.eth.Contract(
        LandContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });

    } catch (error) {

      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );

      console.error(error);
    }
  };

  handleNumberChange(event) {

    // Set the state newNo with input
    this.setState({ newNo: event.target.value });
  }

  handleStreetChange(event) {

    // Set the state newStreetName with input
    this.setState({ newStreetName: event.target.value });
  }

  handleCityChange(event) {

    // Set the state newCity with input
    this.setState({ newCity: event.target.value });
  }

  handleDistrictChange(event) {

    // Set the state newDistrict with input
    this.setState({ newDistrict: event.target.value });
  }

  handleProvinceChange(event) {

    // Set the state newProvince with input
    this.setState({ newProvince: event.target.value });
  }

  handleLawyerIdChange(event) {

    // Set the state newAssignedLawyerId with input
    this.setState({ newAssignedLawyerId: event.target.value });
  }

  handleSellerIdChange(event) {

    // Set the state newAssignedSellerId with input
    this.setState({ newAssignedSellerId: event.target.value });
  }

  async handleSubmit(event) {

    event.preventDefault();

    // Initialize account and contract variables from state
    const { accounts, contract } = this.state;

    // Calling addNewDeed method from the smart contract
    await contract.methods.addNewDeed(
      this.state.newNo,
      this.state.newStreetName,
      this.state.newCity,
      this.state.newDistrict,
      this.state.newProvince,
      this.state.newAssignedLawyerId,
      this.state.newAssignedSellerId
    ).send({ from: accounts[0] });

    // calling the getDeedId method from the smart contract and storing it in a variable
    const response = await contract.methods.findDeedByAddress(
      this.state.newNo,
      this.state.newStreetName,
      this.state.newCity,
      this.state.newDistrict,
      this.state.newProvince
    ).call();

    // Log variable
    console.log(response);

    // Set the state storageValue with the variable
    this.setState({ storageValue: response });
  }

  render() {

    if (!this.state.web3) {

      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">

        <h1>DBlock</h1>

        <div>Last added deed ID: { this.state.storageValue }</div>

        <p></p>

        <form onSubmit={ this.handleSubmit }>

          <label htmlFor="no">Address No:</label>
          <input type="text" id="no" value={ this.state.newNo } onChange={ this.handleNumberChange.bind(this) }/>
          <p></p>

          <label htmlFor="streetname">Street:</label>
          <input type="text" id="streetname" value={ this.state.newStreetName } onChange={ this.handleStreetChange.bind(this) }/>
          <p></p>

          <label htmlFor="city">City:</label>
          <input type="text" id="city" value={ this.state.newCity } onChange={ this.handleCityChange.bind(this) }/>
          <p></p>

          <label htmlFor="district">District:</label>
          <input type="text" id="district" value={ this.state.newDistrict } onChange={ this.handleDistrictChange.bind(this) }/>
          <p></p>

          <label htmlFor="province">Province:</label>
          <input type="text" id="province" value={ this.state.newProvince } onChange={ this.handleProvinceChange.bind(this) }/>
          <p></p>

          <label htmlFor="lawyerid">ID of assigning lawyer:</label>
          <input type="number" id="lawyerid" value={ this.state.newAssignedLawyerId } onChange={ this.handleLawyerIdChange.bind(this) }/>
          <p></p>

          <label htmlFor="sellerid">ID of assigning seller:</label>
          <input type="number" id="sellerid" value={ this.state.newAssignedSellerId } onChange={ this.handleSellerIdChange.bind(this) }/>
          <p></p>

          <input type="submit" value="Submit"/>

        </form>

      </div>
    );
  }
}

export default App;
