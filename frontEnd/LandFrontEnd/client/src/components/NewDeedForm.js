import React, { Component } from "react";
import web3 from "../web3";
import ipfs from "../ipfs";
import './NewDeedForm.css';
import NewDeedIcon from "./Images/newDeed.png";

class NewDeedForm extends Component {

  constructor(props) {

    super(props);

    this.state = {

      storageValue: 0,
      alertMessage: "",
      alertsuccess: "",

      web3: this.props.web3PropFromNav,
      accounts: this.props.accountsPropFromNav,
      contract: this.props.contractPropFromNav,

      stateDeedId: 0,
      newNo: "",
      newStreetName: "",
      newCity: "",
      newDistrict: "",
      newProvince: "",
      newAssignedLawyerEmail: "",
      newAssignedSellerEmail: "",

      ipfsHash: null,
      buffer: '',
      ethAddress: '',
      transactionHash: '',
      txReceipt: ''

    }

    // Binding for scope
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleStreetChange = this.handleStreetChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleDistrictChange = this.handleDistrictChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handleLawyerEmailChange = this.handleLawyerEmailChange.bind(this);
    this.handleSellerEmailChange = this.handleSellerEmailChange.bind(this);
  }

  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  };

  //Convert the file to buffer to store on IPFS 
  convertToBuffer = async (reader) => {
    //file is converted to a buffer for upload to IPFS        
    const buffer = await Buffer.from(reader.result);
    //set this buffer-using es6 syntax        
    this.setState({ buffer });
  };

  //ES6 async 
  functiononClick = async () => {
    try {
      this.setState({ blockNumber: "waiting.." });
      this.setState({ gasUsed: "waiting..." });

      await web3.eth.getTransactionReceipt(
        this.state.transactionHash, (err, txReceipt) => {
          console.log(err, txReceipt);
          this.setState({ txReceipt });
        })
    } catch (error) {
      console.log(error);
    }
  }

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

  handleLawyerEmailChange(event) {

    // Set the state newAssignedLawyerEmail with input
    this.setState({ newAssignedLawyerEmail: event.target.value });
  }

  handleSellerEmailChange(event) {

    // Set the state newAssignedSellerEmail with input
    this.setState({ newAssignedSellerEmail: event.target.value });
  }

  async handleSubmit(event) {

    // prevent auto refresh on submit
    event.preventDefault();

    // Initialize account and contract variables from state
    const { accounts, contract } = this.state;

    // get the lawyer and sellers ID using the search by email function
    const newLawyerID = await contract.methods.findLawyerByEmail(this.state.newAssignedLawyerEmail).call();
    const newSellerID = await contract.methods.findSellerByEmail(this.state.newAssignedSellerEmail).call();

    // get the deed id for the entered address
    const deedIdIfExistent = await contract.methods.findDeedByAddress(
      this.state.newNo,
      this.state.newStreetName,
      this.state.newCity,
      this.state.newDistrict,
      this.state.newProvince
    ).call();

    if (parseInt(deedIdIfExistent) > -1) // if the deed already exists
    {
      console.log("Deed already exists!");
      this.setState({ alertMessage: "Deed already exists!", alertsuccess: "" });
    }
    else if (parseInt(newLawyerID) === -1) // if the lawyer for the relevant email does not exits
    {
      console.log("Lawyer of that email address does not exists!");
      this.setState({ alertMessage: "Lawyer of that email address does not exists!", alertsuccess: "" });
    }
    else if (parseInt(newSellerID) === -1) // if the seller for the relevant email does not exits
    {
      console.log("Seller of that email address does not exists!");
      this.setState({ alertMessage: "Seller of that email address does not exists!", alertsuccess: "" });
    }
    else {
      console.log("OK");
      // Referred from https://www.freecodecamp.org/news/hands-on-get-started-with-infura-and-ipfs-on-ethereum-b63635142af0/

      // Calling addNewDeed method from the smart contract
      await contract.methods.addNewDeed(
        this.state.newNo,
        this.state.newStreetName,
        this.state.newCity,
        this.state.newDistrict,
        this.state.newProvince,
        newLawyerID,
        newSellerID
      ).send({ from: accounts[0] });


      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log(err, ipfsHash);

        //setState by setting ipfsHash to ipfsHash[0].hash        
        this.setState({ ipfsHash: ipfsHash[0].hash });

        // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
        //return the transaction hash from the ethereum contract        
        contract.methods.sendHash(this.state.stateDeedId, this.state.ipfsHash).send({
          from: accounts[0]
        }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({ transactionHash });
        });
      })
      // getting the deed count
      const response = await contract.methods.getDeedCount().call();

      // getting the deed ID
      const deedId = (response - 1);

      // Log variable
      console.log(response);

      // Set the state storageValue with the variable
      this.setState({ storageValue: response, stateDeedId: deedId, alertMessage: "", alertsuccess: "Deed Registered successfully" });
    }
  }

  async refreshpage(_event) {
    window.location.reload(false);
  }

  render() {

    if (!this.state.web3) {

      return <div>Loading Web3, accounts, and contract for new deed...</div>;
    }

    return (
      // description about the new deed form page
      <div className="NewDeedForm">
        <div className="newDeedForm-glass">
        <div className="newDeed-topic">
          <h2 className="newDeed-heading">New Deed</h2>
          <img src={NewDeedIcon} alt="New Deed Icon" className="newDeed-icon" />
        </div>

        {/* Displays the current amount of deeds stored */}
        <div className="deedcount">Deed count: {this.state.storageValue}</div>

        <div className="container">
          <form className="form" onSubmit={this.handleSubmit}>

            {/* Form that inputs data in regard of a new deed */}
            <div className="addressno">
              <label htmlFor="no">Address No:</label>
              <input className="newDeed-input" type="text" minLength="1" id="no" value={this.state.newNo} onChange={this.handleNumberChange} required />
            </div>

            <div className="streetname">
              <label htmlFor="streetname">Street:</label>
              <input className="newDeed-input" type="text" minLength="1" id="streetname" value={this.state.newStreetName} onChange={this.handleStreetChange} required />
            </div>

            <div className="city">
              <label htmlFor="city">City:</label>
              <input className="newDeed-input" type="text" minLength="1" id="city" value={this.state.newCity} onChange={this.handleCityChange} required />
            </div>

            <div className="district">
              <label htmlFor="district">District:</label>
              <input className="newDeed-input" type="text" minLength="1" id="district" value={this.state.newDistrict} onChange={this.handleDistrictChange} required />
            </div>

            <div className="province">
              <label htmlFor="province">Province:</label>
              <input className="newDeed-input" type="text" minLength="1" id="province" value={this.state.newProvince} onChange={this.handleProvinceChange} required />
            </div>

            <div className="lawyerid">
              <label htmlFor="lawyeremail">Email of assigning lawyer:</label>
              <input className="newDeed-input" type="email" id="lawyeremail" value={this.state.newAssignedLawyerEmail} onChange={this.handleLawyerEmailChange} required />
            </div>

            <div className="sellerid">
              <label htmlFor="selleremail">Email of assigning seller:</label>
              <input className="newDeed-input" type="email" id="selleremail" value={this.state.newAssignedSellerEmail} onChange={this.handleSellerEmailChange} required />
            </div>

            <form className="chooseFile" onSubmit={this.onSubmit} >
              <input type="file" className="chooseFile-button" onChange={this.captureFile} />
              {/* <input type='submit' className="button"/> */}
            </form>

            <div className="deedduplicateval">{this.state.alertMessage}</div>
            <div className="successval">{this.state.alertsuccess}</div>


            <div>
              <form className="clear-button" onSubmit={this.refreshpage}>
                <button className="newDeed-clear">Clear</button>
              </form>
            </div>

            <div>
              <input type="submit" value="Submit" className="newDeed-submit" />
            </div>

          </form>

        </div>
        </div>

      </div>
    );
  }
}

export default NewDeedForm;
