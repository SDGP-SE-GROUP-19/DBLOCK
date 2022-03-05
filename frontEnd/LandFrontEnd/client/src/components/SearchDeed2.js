import React, { Component } from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";

class SearchDeed2 extends Component {

  constructor(props) {

    super(props);

    this.state = {

      storageValue: 0, // Deed ID

      lawyerId: 0,
      lawyerName: "",
      lawyerNic: "",
      lawyerRegNo: "",
      lawyerEmail: "",

      web3: null,
      accounts: null,
      contract: null,

      newNo: "",
      newStreetName: "",
      newCity: "",
      newDistrict: "",
      newProvince: ""
    }
  }

  componentDidMount = async () => {

    try {

      // Binding for scope
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleNumberChange = this.handleNumberChange.bind(this);
      this.handleStreetChange = this.handleStreetChange.bind(this);
      this.handleCityChange = this.handleCityChange.bind(this);
      this.handleDistrictChange = this.handleDistrictChange.bind(this);
      this.handleProvinceChange = this.handleProvinceChange.bind(this);

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

  async handleSubmit(event) {

    // prevent auto refresh on submit
    event.preventDefault();

    // Initialize account and contract variables from state
    const { contract } = this.state;

    // Calling findDeedByAddress method from the smart contract
    const deedIndex = await contract.methods.findDeedByAddress(
      this.state.newNo,
      this.state.newStreetName,
      this.state.newCity,
      this.state.newDistrict,
      this.state.newProvince
    ).call();

    // getting the lawyers index 
    const lawyerIndex = await contract.methods.getLawyerIdOfDeed(deedIndex).call();

    // getting the lawyers info
    const lawyerIdVar = await contract.methods.getLawyerId(lawyerIndex).call();
    const lawyerNameVar = await contract.methods.getLawyerName(lawyerIndex).call();
    const lawyerNicVar = await contract.methods.getLawyerNic(lawyerIndex).call();
    const lawyerRegNoVar = await contract.methods.getLawyerRegNo(lawyerIndex).call();
    const lawyerEmailVar = await contract.methods.getLawyerEmail(lawyerIndex).call();

    // Log variables
    console.log(
      "Deed ID :", deedIndex,
      ", Lawyer ID :", lawyerIdVar,
      ", Lawyer Name :", lawyerNameVar,
      ", Lawyer NIC :", lawyerNicVar,
      ", Lawyer Registration No :", lawyerRegNoVar,
      ", Lawyer Email :", lawyerEmailVar
    );

    // Set the state storageValue with the variable
    this.setState({ 
      storageValue: deedIndex,
      lawyerId: lawyerIdVar,
      lawyerName: lawyerNameVar, 
      lawyerNic: lawyerNicVar, 
      lawyerRegNo: lawyerRegNoVar,
      lawyerEmail: lawyerEmailVar
    });
  }

  render() {

    if (!this.state.web3) {

      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="SearchDeed2">

        <h3>Deed Search By Address</h3>

        <p></p>

        <form onSubmit={ this.handleSubmit }>

          <fieldset className="getDeedInfo">

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

            <input type="submit" value="Submit"/>

          </fieldset>

          <p></p>

          <div>Deed ID: { this.state.storageValue }</div>

          <p></p>

          <fieldset className="displayLawyerInfo">

            <div>Lawyer ID: { this.state.lawyerId }</div>

            <p></p>

            <div>Lawyer Name: { this.state.lawyerName }</div>

            <p></p>

            <div>Lawyer NIC: { this.state.lawyerNic }</div>

            <p></p>

            <div>Lawyer Registration Number: { this.state.lawyerRegNo }</div>

            <p></p>

            <div>Lawyer Email: { this.state.lawyerEmail }</div>

          </fieldset>

          <p></p>

          <fieldset className="displayOwnerInfo">

            

          </fieldset>

        </form>

      </div>
    );
  }
}

export default SearchDeed2;
