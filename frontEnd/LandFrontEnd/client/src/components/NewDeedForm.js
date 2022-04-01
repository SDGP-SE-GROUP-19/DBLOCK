import React, { Component } from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";
import web3 from "../web3";
import ipfs from "../ipfs";
import './NewDeedForm.css';
import deed from "./Images/deed.png";

class NewDeedForm extends Component {

  constructor(props) {

    super(props);

    this.state = {

      storageValue: 0,
      alertMessage: "",
      alertsuccess: "",

      web3: null,
      accounts: null,
      contract: null,
      
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

  componentDidMount = async () => {

    try {

      // Binding for scope
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleNumberChange = this.handleNumberChange.bind(this);
      this.handleStreetChange = this.handleStreetChange.bind(this);
      this.handleCityChange = this.handleCityChange.bind(this);
      this.handleDistrictChange = this.handleDistrictChange.bind(this);
      this.handleProvinceChange = this.handleProvinceChange.bind(this);
      this.handleLawyerEmailChange = this.handleLawyerEmailChange.bind(this);
      this.handleSellerEmailChange = this.handleSellerEmailChange.bind(this);

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
    else
    {
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
      this.setState({ storageValue: response, stateDeedId: deedId, alertMessage: "", alertsuccess:"Deed Registered successfully" });
    }
  }

  async refreshpage(_event) {
    window.location.reload(false);
  }

  render() {

    if (!this.state.web3) {

      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      // description about the new deed form page
      <div className="NewDeedForm">
        <div className="headingND">
          <h2 className="topicND">New Deed</h2>
          <img src={deed} alt="deed" className="deed"/>
        </div>

        {/* Displays the current amount of deeds stored */}
        <div className="deedcount">Deed count: { this.state.storageValue }</div>
        
      <div className="container">
          <form className="form" onSubmit={ this.handleSubmit }>
            
            {/* Form that inputs data in regard of a new deed */}
            <div className="addressno">
            <label htmlFor="no">Address No:</label>
            <input className="input" type="text" minLength="1" id="no" value={ this.state.newNo } onChange={ this.handleNumberChange.bind(this) } required/>
            </div>

            <div className="streetname">
            <label htmlFor="streetname">Street:</label>
            <input className="input" type="text" minLength="1" id="streetname" value={ this.state.newStreetName } onChange={ this.handleStreetChange.bind(this) } required/>
            </div>

            <div className="city">
            <label htmlFor="city">City:</label>
            <input className="input" type="text" minLength="1" id="city" value={ this.state.newCity } onChange={ this.handleCityChange.bind(this) } required/>
            </div>

            <div className="district">
            <label htmlFor="district">District:</label>
            <input className="input" type="text" minLength="1" id="district" value={ this.state.newDistrict } onChange={ this.handleDistrictChange.bind(this) } required/>
            </div>

            <div className="province">
            <label htmlFor="province">Province:</label>
            <input className="input" type="text" minLength="1" id="province" value={ this.state.newProvince } onChange={ this.handleProvinceChange.bind(this) } required/>
            </div>

            <div className="lawyerid">
            <label htmlFor="lawyeremail">Email of assigning lawyer:</label>
            <input className="input" type="email" id="lawyeremail" value={ this.state.newAssignedLawyerEmail } onChange={ this.handleLawyerEmailChange.bind(this) } required/>
            </div>

            <div className="sellerid">
            <label htmlFor="selleremail">Email of assigning seller:</label>
            <input className="input" type="email" id="selleremail" value={ this.state.newAssignedSellerEmail } onChange={ this.handleSellerEmailChange.bind(this) } required/>
            </div>

            <form className="buttonCF" onSubmit={this.onSubmit} >
              <input type="file" onChange={this.captureFile} />
              {/* <input type='submit' className="button"/> */}
            </form>

            <div className="deedduplicateval">{ this.state.alertMessage }</div>
            <div className="successval">{ this.state.alertsuccess }</div>
            

            <div>
              <input type="submit" value="Submit" className="button"/>
            </div>

            <div>
              <form className="refresh" onSubmit={ this.refreshpage }>
                <button className="refreshbtn">Clear Form</button>
              </form>
            </div>
 
          </form>
        
        </div>

      </div>
    );
  }
}

export default NewDeedForm;
