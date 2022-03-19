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

      web3: null,
      accounts: null,
      contract: null,
      
      stateDeedId: 0,
      newNo: "",
      newStreetName: "",
      newCity: "",
      newDistrict: "",
      newProvince: "",
      newAssignedLawyerId: 0,
      newAssignedSellerId: 0,

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

    // prevent auto refresh on submit
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
    this.setState({ storageValue: response, stateDeedId: deedId });
  }

  render() {

    if (!this.state.web3) {

      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="NewDeedForm">
        <div className="headingND">
          <h2 className="topicND">New Deed</h2>
          <img src={deed} alt="deed" className="deed"/>
        </div>

        <div className="deedcount">Deed count: { this.state.storageValue }</div>
        
      <div className="container">
        <form className="form" onSubmit={ this.handleSubmit }>
          
          <div className="addressno">
          <label htmlFor="no">Address No:</label>
          <input className="input" type="text" id="no" value={ this.state.newNo } onChange={ this.handleNumberChange.bind(this) }/>
          </div>

          <div className="streetname">
          <label htmlFor="streetname">Street:</label>
          <input className="input" type="text" id="streetname" value={ this.state.newStreetName } onChange={ this.handleStreetChange.bind(this) }/>
          </div>

          <div className="city">
          <label htmlFor="city">City:</label>
          <input className="input" type="text" id="city" value={ this.state.newCity } onChange={ this.handleCityChange.bind(this) }/>
          </div>

          <div className="district">
          <label htmlFor="district">District:</label>
          <input className="input" type="text" id="district" value={ this.state.newDistrict } onChange={ this.handleDistrictChange.bind(this) }/>
          </div>

          <div className="province">
          <label htmlFor="province">Province:</label>
          <input className="input" type="text" id="province" value={ this.state.newProvince } onChange={ this.handleProvinceChange.bind(this) }/>
          </div>

          <div className="lawyerid">
          <label htmlFor="lawyerid">ID of assigning lawyer:</label>
          <input className="input" type="number" id="lawyerid" value={ this.state.newAssignedLawyerId } onChange={ this.handleLawyerIdChange.bind(this) }/>
          </div>

          <div className="sellerid">
          <label htmlFor="sellerid">ID of assigning seller:</label>
          <input className="input" type="number" id="sellerid" value={ this.state.newAssignedSellerId } onChange={ this.handleSellerIdChange.bind(this) }/>
          </div>

          <form className="buttonCF" onSubmit={this.onSubmit} >
            <input type="file" onChange={this.captureFile} />
            {/* <input type='submit' className="button"/> */}
          </form>

          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <div>
            <input type="submit" value="Submit" className="button"/>
          </div>

        </form>
        
        </div>

      </div>
    );
  }
}

export default NewDeedForm;
