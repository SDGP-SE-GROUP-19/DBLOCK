import React, { Component } from "react";
import './SearchDeed2.css';
import searchDeed2Icon from "./Images/searchdeed2.png"

class SearchDeed2 extends Component {

  constructor(props) {

    super(props);

    this.state = {

      storageValue: 0, // Deed ID
      addressAlert: "", // will change if the deed does not exist

      lawyerId: 0,
      lawyerName: "",
      lawyerNic: "",
      lawyerRegNo: "",
      lawyerEmail: "",
      lawyerTelNo: 0,

      ownerId: 0,
      ownerName: "",
      ownerNic: "",
      ownerAge: 0,
      ownerCity: "",
      ownerTeleNo: 0,
      ownerEmail: "",

      web3: this.props.web3PropFromNav,
      accounts: this.props.accountsPropFromNav,
      contract: this.props.contractPropFromNav,

      newNo: "",
      newStreetName: "",
      newCity: "",
      newDistrict: "",
      newProvince: ""
    }

    // Binding for scope
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleStreetChange = this.handleStreetChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleDistrictChange = this.handleDistrictChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
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

    if (parseInt(deedIndex) === -1)
    {
      console.log("deedIndex: " + deedIndex + " is invalid!");

      this.setState({ 
        
        storageValue: deedIndex,
        addressAlert: "INVALID ADDRESS!",

        lawyerId: "",
        lawyerName: "", 
        lawyerNic: "", 
        lawyerRegNo: "",
        lawyerEmail: "",
        lawyerTelNo: "",

        ownerId: "",
        ownerName: "",
        ownerNic: "",
        ownerAge: "",
        ownerCity: "",
        ownerTeleNo: "",
        ownerEmail: ""
      });
    }
    else
    {
      // getting the lawyers index 
      const lawyerIndex = await contract.methods.getLawyerIdOfDeed(deedIndex).call();

      // getting the lawyers info
      const lawyerIdVar = await contract.methods.getLawyerId(lawyerIndex).call();
      const lawyerNameVar = await contract.methods.getLawyerName(lawyerIndex).call();
      const lawyerNicVar = await contract.methods.getLawyerNic(lawyerIndex).call();
      const lawyerRegNoVar = await contract.methods.getLawyerRegNo(lawyerIndex).call();
      const lawyerEmailVar = await contract.methods.getLawyerEmail(lawyerIndex).call();
      const lawyerTelNoVar = await contract.methods.getLawyerTelephoneNumber(lawyerIndex).call();

      // getting the owners index
      const ownerIndex = await contract.methods.getSellerIdOfDeed(deedIndex).call();

      // getting the owners info
      const ownerIdVar = await contract.methods.getSellerId(ownerIndex).call();
      const ownerNameVar = await contract.methods.getSellerName(ownerIndex).call();
      const ownerNicVar = await contract.methods.getSellerNic(ownerIndex).call();
      const ownerAgeVar = await contract.methods.getSellerAge(ownerIndex).call();
      const ownerCityVar = await contract.methods.getSellerCity(ownerIndex).call();
      const ownerEmailVar = await contract.methods.getSellerEmail(ownerIndex).call();
      const ownerTeleNoVar = await contract.methods.getSellerTelephoneNo(ownerIndex).call();

      // Log variables
      console.log(

        "Deed ID :", deedIndex,

        ", Lawyer ID :", lawyerIdVar,
        ", Lawyer Name :", lawyerNameVar,
        ", Lawyer NIC :", lawyerNicVar,
        ", Lawyer Registration No :", lawyerRegNoVar,
        ", Lawyer Email :", lawyerEmailVar,
        ", Lawyer Tel No :", lawyerTelNoVar,

        ", Owner ID :", ownerIdVar,
        ", Owner Name :", ownerNameVar,
        ", Owner NIC :", ownerNicVar,
        ", Owner Age :", ownerAgeVar,
        ", Owner City :", ownerCityVar,
        ", Owner Email :", ownerEmailVar,
        ", Owner Telephone No :", ownerTeleNoVar
      );

      // Set the state with the variables
      this.setState({

        storageValue: deedIndex,
        addressAlert: "",

        lawyerId: lawyerIdVar,
        lawyerName: lawyerNameVar, 
        lawyerNic: lawyerNicVar, 
        lawyerRegNo: lawyerRegNoVar,
        lawyerEmail: lawyerEmailVar,
        lawyerTelNo: lawyerTelNoVar,

        ownerId: ownerIdVar,
        ownerName: ownerNameVar,
        ownerNic: ownerNicVar,
        ownerAge: ownerAgeVar,
        ownerCity: ownerCityVar,
        ownerTeleNo: ownerTeleNoVar,
        ownerEmail: ownerEmailVar
      });
    }
  }

  async refreshpage(_event) {
    window.location.reload(false);
  }

  render() {

    if (!this.state.web3) {

      return <div>Loading Web3, accounts, and contract for search deed by address...</div>;
    }

    return (
      // displays details regarding the search deed by address
      <div className="SearchDeed2">
        <div className="searchDeed2-glass">
        <div className="searchDeed2-topic">
          <h2 className="searchDeed2-heading">Deed Search By Address</h2>
          <img src={searchDeed2Icon} alt="search Deed2 Icon" className="searchDeed2-icon" />
        </div>
        {/* shows the deed id */}
        <div className="variableSD2"><b>Deed ID:</b> { this.state.storageValue }</div> 
        

      
      <form onSubmit={ this.handleSubmit }>

          <fieldset className="getDeedInfo">
            {/* takes user input to search for a deed */}
            <label className="searchDeed2-label" htmlFor="no">Address No:</label>
            <input type="text" className="searchDeed2-input" id="no" value={ this.state.newNo } onChange={ this.handleNumberChange } required/>
            

            <label className="searchDeed2-label" htmlFor="streetname">Street:</label>
            <input type="text" className="searchDeed2-input" id="streetname" value={ this.state.newStreetName } onChange={ this.handleStreetChange } required/>
            

            <label className="searchDeed2-label" htmlFor="city">City:</label>
            <input type="text" className="searchDeed2-input" id="city" value={ this.state.newCity } onChange={ this.handleCityChange } required/>
            

            <label className="searchDeed2-label" htmlFor="district">District:</label>
            <input type="text" className="searchDeed2-input" id="district" value={ this.state.newDistrict } onChange={ this.handleDistrictChange } required/>
            

            <label className="searchDeed2-label" htmlFor="province">Province:</label>
            <input type="text" className="searchDeed2-input" id="province" value={ this.state.newProvince } onChange={ this.handleProvinceChange } required/>

            
            <div className="addressalert">{ this.state.addressAlert }</div>
            
              
            <div className="btn">
            <input type="submit" value="Submit" className="searchDeed2-button"/>
            </div>

            <div>
              <form className="refresh" onSubmit={ this.refreshpage }>
                <button className="searchDeed2-button">Refresh Form</button>
              </form>
            </div>

          </fieldset>
          </form>


          <div className="searchDeed2-glass2">
          <fieldset className="displayLawyerInfo">
            {/* display relevant lawyer details in regard of that deed */}
            <h4>Relevant Lawyer's Info</h4>
            <p></p>

            <div>Lawyer ID: { this.state.lawyerId }</div>
            <p></p>

            <div>Lawyer Name: { this.state.lawyerName }</div>
            <p></p>

            <div>Lawyer NIC: { this.state.lawyerNic }</div>
            <p></p>

            <div>Lawyer Registration Number: { this.state.lawyerRegNo }</div>
            <p></p>

            <div>Lawyer Email: { this.state.lawyerEmail }</div>
            <p></p>

            <div>Lawyer Telephone Number: { this.state.lawyerTelNo }</div>
            <p></p>

          </fieldset>

          <p></p>

          <fieldset className="displayOwnerInfo">
            {/* display owners information in regard of that deed */}
            <h4>Relevant Owner's Info</h4>
            <p></p>

            <div>Owner ID: { this.state.ownerId }</div>
            <p></p>

            <div>Owner Name: { this.state.ownerName }</div>
            <p></p>

            <div>Owner NIC: { this.state.ownerNic }</div>
            <p></p>

            <div>Owner Age: { this.state.ownerAge }</div>
            <p></p>

            <div>Owner City: { this.state.ownerCity }</div>
            <p></p>

            <div>Owner Telephone Number: { this.state.ownerTeleNo }</div>
            <p></p>

            <div>Owner Email: { this.state.ownerEmail }</div>
            <p></p>

          </fieldset>
          </div>

        </div>

      </div>
    );
  }
}

export default SearchDeed2;
