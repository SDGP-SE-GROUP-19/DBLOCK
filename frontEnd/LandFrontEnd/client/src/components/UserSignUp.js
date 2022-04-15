import React, { Component } from "react";
import './UserSignUp.css';
import newUserIcon from "./Images/user.png";

class UserSignUp extends Component {

  constructor(props) {

    super(props);

    this.state = {
      alertMessage: "",
      sellerCount: 0,
      storageValue: 0,

      web3: this.props.web3PropFromNav,
      accounts: this.props.accountsPropFromNav,
      contract: this.props.contractPropFromNav,

      name:"",
      id:0,
      nic:"",
      age:"",
      city:"",
      email:"",
      telephoneNumber:"",
      password:""

    }

    // Binding for scope
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handlenicChange = this.handlenicChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handlecityChange = this.handlecityChange.bind(this);
    this.handleemailChange = this.handleemailChange.bind(this);
    this.handletelephoneNumberChange = this.handletelephoneNumberChange.bind(this);
    this.handlepasswordChange = this.handlepasswordChange.bind(this);
  }
  
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

    // Set the state newAssigned SellerId with input
    this.setState({ telephoneNumber: event.target.value });
  }

  handlepasswordChange(event) {

    // Set the state newAssigned User password with input
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {

    // prevent auto refresh on submit
    event.preventDefault();

    // Initialize account and contract variables from state
    const { accounts, contract } = this.state;
    const sellerId = await contract.methods.findSellerByEmail(this.state.email).call();

    if (parseInt(sellerId) === -1)
    {
        // Calling register seller (user) method from the smart contract
        await contract.methods.registerSeller(
            this.state.name,
            this.state.nic,
            this.state.age,
            this.state.city,
            this.state.email,
            this.state.telephoneNumber,
            this.state.password
        ).send({ from: accounts[0] });

        // get the number of users added so far fron the blockchain using getLawyerCount method in smart contract
        const sellerCountVar = await contract.methods.getSellersCount().call();

        // set the state with the new user count
        this.setState({ storageValue: sellerCountVar, alertMessage: "" });
    }
    else
    {
        this.setState({ alertMessage: "Email already exists!" });
        console.log("Email already exists!");
    }


  }

  async refreshpage(_event) {
    window.location.reload(false);
  }
  

  render() {

    if (!this.state.web3) {

      return <div>Loading Web3, accounts, and contract for user sign up...</div>;
    }

    return (
      // displays details about the new user sign up page
      <div className="Sign-Up">
        <div className="newUser-glass">
        <div className="newUser-topic">
          <h2 className="newUser-heading">New User</h2>
          <img src={newUserIcon} alt="New User Icon" className="newUser-icon"/>
        </div>
        {/* displays the current seller count */}
        <div className="Sellercount">Seller count: { this.state.storageValue }</div>
        
      <div className="newUser-container">
        <form className="newUser-form" onSubmit={ this.handleSubmit }>
          {/* form used to take input about the user's information */}
          <div className="name">
          <label htmlFor="name">Name:</label>
          <input className="newUser-input" type="text" id="no" value={ this.state.name } onChange={ this.handleNameChange }/>
          </div>

          <div className="Nic">
          <label htmlFor="Nic">Nic:</label>
          <input className="newUser-input" type="text" minLength="10"  maxLength="12" id="nic" value={ this.state.nic } onChange={ this.handlenicChange }/>
          </div>

          <div className="Age">
          <label htmlFor="Age">Age:</label>
          <input className="newUser-input" type="text" id="Age" value={ this.state.age } onChange={ this.handleAgeChange }/>
          </div>

          <div className="City">
          <label htmlFor="province">City:</label>
          <input className="newUser-input" type="text" id="City" value={ this.state.city } onChange={ this.handlecityChange }/>
          </div>

          <div className="Email">
          <label htmlFor="Email">Email:</label>
          <input className="newUser-input" type="email" id="Email" value={ this.state.email } onChange={ this.handleemailChange }/>
          </div>
          <div>{ this.state.alertMessage }</div>

          <div className="telephone">
          <label htmlFor="telephone">Telephone Number:</label>
          <input className="newUser-input" type="number" min="0" id="telephonenumber" value={ this.state.telephoneNumber } onChange={ this.handletelephoneNumberChange }/>
          </div>

          <div className="Password">
          <label htmlFor="Password">Password:</label>
          <input className="newUser-input" type="password" id="password" value={ this.state.password } onChange={ this.handlepasswordChange }/>
          </div>
          

          <div>
            <form className="clear-button" onSubmit={ this.refreshpage }>
              <button className="newUser-clear">Clear</button>
            </form>
          </div>

          <div>
          <input type="submit" value="Submit" className="newUser-submit"/>
          </div>

        </form>
        
        </div>
        </div>

      </div>
    );
  }
}

export default UserSignUp;
