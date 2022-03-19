import React, { Component } from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";
import './SearchDeed.css';
import searchdeed from "./Images/searchdeed.png";

class SearchDeed extends Component {

    constructor(props) {

        super(props);

        this.state = {

            searchedNo: "",
            ipfsHash:"",
            searchedStreetName: "",
            searchedCity: "",
            searchedDistrict: "",
            searchedProvince: "",
            searchedLawyerId: 0,
            searchedSellerId: 0,

            web3: null,
            accounts: null,
            contract: null,

            searchingDeedId: 0
        }
    }

    componentDidMount = async () => {

        try {

          // Binding for scope
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleSearchingDeedIdChange = this.handleSearchingDeedIdChange.bind(this);
    
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

    handleSearchingDeedIdChange(event) {

        // Set the state searchingDeedId with input
        this.setState({ searchingDeedId: event.target.value });
    }

    async handleSubmit(event) {

        // prevent auto refresh on submit
        event.preventDefault();
    
        // Initialize contract variables from state
        const { contract, searchingDeedId } = this.state;
    
        // get the relevant deed data
        const deedNoResponse = await contract.methods.getDeedNo(searchingDeedId).call();
        const deedStreetResponse = await contract.methods.getDeedStreetName(searchingDeedId).call();
        const deedCityResponse = await contract.methods.getDeedCity(searchingDeedId).call();
        const deedDistrictResponse = await contract.methods.getDeedDistrict(searchingDeedId).call();
        const deedProvinceResponse = await contract.methods.getDeedProvince(searchingDeedId).call();
        const deedLawyerResponse = await contract.methods.getLawyerIdOfDeed(searchingDeedId).call();
        const deedSellerResponse = await contract.methods.getSellerIdOfDeed(searchingDeedId).call();
        const ipfsHash = await contract.methods.getHashFromDeed(searchingDeedId).call();

        // log variables
        console.log(
            "Deed Info: ",
            deedNoResponse,", ",
            ipfsHash,", ",
            deedStreetResponse,", ",
            deedCityResponse,", ",
            deedDistrictResponse,", ",
            deedProvinceResponse,", LID[",
            deedLawyerResponse,"], SID[",
            deedSellerResponse,"]"
        );

        // setting the state with relevant info
        this.setState({

            searchedNo: deedNoResponse,
            ipfsHash: ipfsHash,
            searchedStreetName: deedStreetResponse,
            searchedCity: deedCityResponse,
            searchedDistrict: deedDistrictResponse,
            searchedProvince: deedProvinceResponse,
            searchedLawyerId: deedLawyerResponse,
            searchedSellerId: deedSellerResponse
        });
    }

    render() {

        if (!this.state.web3) {

            return <div>Loading Web3, accounts, and contract...</div>;
        }

        return (
            <div className="SearchDeed">
                <div className="headingDS">
                    <h2 className="topicDS">Deed Search</h2>
                    <img src={searchdeed} alt="searchdeed" className="searchdeed"/>

                    <form onSubmit={ this.handleSubmit }>

                        <label className="DeedIdtext">Deed ID:</label>
                        <input type="number" id="deedid" value={ this.state.searchingDeedId } onChange={ this.handleSearchingDeedIdChange.bind(this) }/>
                        <div>
                            <input type="submit" value="Submit" className="DSVDbtn"/>
                        </div>
                    </form>
                </div>
                 

                

                <div className="containerDS">

                    <form className="formDS">
                    
                    <div className="addressnoDS">
                    <p><b>No: </b>{ this.state.searchedNo }</p>
                    </div>
                    
                    <div className="streetnameDS">
                    <p><b>Street: </b>{ this.state.searchedStreetName }</p>
                    </div>

                    <div className="cityDS">
                    <p><b>City: </b>{ this.state.searchedCity }</p>
                    </div>

                    <div className="districtDS">
                    <p><b>District: </b>{ this.state.searchedDistrict }</p>
                    </div>

                    <div className="provinceDS">
                    <p><b>Province: </b>{ this.state.searchedProvince }</p>
                    </div>

                    <div className="lawyeridDS">
                    <p><b>Assigned Lawyer ID: </b>{ this.state.searchedLawyerId }</p>
                    </div>

                    <div className="selleridDS">
                    <p><b>Assigned Seller ID: </b>{ this.state.searchedSellerId }</p>
                    </div>

                    <button
                        type="button"
                        className="DSVDbtn"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `https://ipfs.io/ipfs/${this.state.ipfsHash}`;
                        }}>Deed image
                    </button>

                    </form>

                </div>
                
            </div>
        );
    }
}

export default SearchDeed;
