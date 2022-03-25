import React, { Component } from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";
import './UserSignUp.css';
import sign from "./Images/sign.png";

class UserSignUp extends Component {

  constructor(props) {

    super(props);

    this.state = {
      alertMessage: "",
      sellerCount: 0,
      storageValue: 0,

      web3: null,
      accounts: null,
      contract: null,
    

      name:"",
      id:0,
      nic:"",
      age:"",
      city:"",
      email:"",
      telephoneNumber:""


    }
  }
  

  componentDidMount = async () => {

    try {

      // Binding for scope
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleIdChange = this.handleIdChange.bind(this);
      this.handlenicChange = this.handlenicChange.bind(this);
      this.handleAgeChange = this.handleAgeChange.bind(this);
      this.handleCityChange = this.handlecityChange.bind(this);
      this.handleemailChange = this.handleemailChange.bind(this);
      this.handletelephoneNumberChange = this.handletelephoneNumberChange.bind(this);

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

  handleNameChange(event) {

    // Set the state newNo with input
    this.setState({ name: event.target.value });
  }

  handleIdChange(event) {

    // Set the state newStreetName with input
    this.setState({ id: event.target.value });
  }

  handlenicChange(event) {

    // Set the state newCity with input
    this.setState({ nic: event.target.value });
  }

  handleAgeChange(event) {

    // Set the state newDistrict with input
    this.setState({ age: event.target.value });
  }

  handlecityChange(event) {

    // Set the state newProvince with input
    this.setState({ city: event.target.value });
  }

  handleemailChange(event) {

    // Set the state newAssignedLawyerId with input
    this.setState({ email: event.target.value });
  }

  handletelephoneNumberChange(event) {

    // Set the state newAssignedSellerId with input
    this.setState({ telephoneNumber: event.target.value });
  }

  async handleSubmit(event) {

    // prevent auto refresh on submit
    event.preventDefault();

    // Initialize account and contract variables from state
    const { accounts, contract } = this.state;
    const sellerId = await contract.methods.findSellerByEmail(this.state.email).call();

    if (parseInt(sellerId) === -1)
    {
        // Calling registerLawyer method from the smart contract
        await contract.methods.registerSeller(
            this.state.name,
            
            this.state.nic,
            this.state.age,
            this.state.city,
            this.state.email,
            this.state.telephoneNumber
        ).send({ from: accounts[0] });

        // get the number of lawyers added so far fron the blockchain using getLawyerCount method in smart contract
        const sellerCountVar = await contract.methods.getSellersCount().call();

        // set the state with the new lawyer count
        this.setState({ sellerCount: sellerCountVar, alertMessage: "" });
    }
    else
    {
        this.setState({ alertMessage: "Email already exists!" });
        console.log("Email already exists!");
    }


  }
  

  render() {

    if (!this.state.web3) {

      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="Sign Up">
        <div className="headingS">
          <h2 className="topicS">New User</h2>
          <img src={sign} alt="sign" className="sign"/>
        </div>

        <div className="Sellercount">Seller count: { this.state.storageValue }</div>
        
      <div className="containerS">
        <form className="formS" onSubmit={ this.handleSubmit }>
          
          <div className="name">
          <label htmlFor="name">Name:</label>
          <input className="input" type="text" id="no" value={ this.state.name } onChange={ this.handleNameChange.bind(this) }/>
          </div>

          <div className="Nic">
          <label htmlFor="Nic">Nic:</label>
          <input className="input" type="text" minLength="10"  maxLength="12" id="nic" value={ this.state.nic } onChange={ this.handlenicChange.bind(this) }/>
          </div>

          <div className="Age">
          <label htmlFor="Age">Age:</label>
          <input className="input" type="text" id="Age" value={ this.state.age } onChange={ this.handleAgeChange.bind(this) }/>
          </div>

          <div className="City">
          <label htmlFor="province">City:</label>
          <input className="input" type="text" id="City" value={ this.state.city } onChange={ this.handlecityChange.bind(this) }/>
          </div>

          <div className="Email">
          <label htmlFor="Email">Email:</label>
          <input className="input" type="email" id="Email" value={ this.state.email } onChange={ this.handleemailChange.bind(this) }/>
          </div>
          <div>{ this.state.alertMessage }</div>

          <div className="telephone">
          <label htmlFor="telephone">Telephone Number:</label>
          <input className="input" type="number" min="0" id="telephonenumber" value={ this.state.telephoneNumber } onChange={ this.handletelephoneNumberChange.bind(this) }/>
          </div>





          <div>
          <input type="submit" value="Submit" className="buttonS"/>
          </div>

        </form>
        
        </div>

      </div>
    );
  }
}

export default UserSignUp;
