import React, { Component } from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";

class SearchDeed extends Component {

    state = {

        searchedNo: "",
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
    };

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

        // log variables
        console.log("Deed Info:");
        console.log(deedNoResponse);
        console.log(deedStreetResponse);
        console.log(deedCityResponse);
        console.log(deedDistrictResponse);
        console.log(deedProvinceResponse);
        console.log(deedLawyerResponse);
        console.log(deedSellerResponse);

        // setting the state with relevant info
        this.setState({

            searchedNo: deedNoResponse,
            searchedStreetName: deedStreetResponse,
            searchedCity: deedCityResponse,
            searchedDistrict: deedDistrictResponse,
            searchedProvince: deedProvinceResponse,
            searchedLawyerId: deedLawyerResponse,
            searchedSellerId: deedSellerResponse
        });
    }

    render() {

        return (
            <div className="SearchDeed">

                <h3>Deed Search</h3>

                <form onSubmit={ this.handleSubmit }>

                    <label htmlFor="deedid">Deed ID:</label>
                    <input type="number" id="deedid" value={ this.state.searchingDeedId } onChange={ this.handleSearchingDeedIdChange.bind(this) }/>
                    <p></p>

                    <input type="submit" value="Submit"/>

                </form>

                <div>

                    <p><b>No: </b>{ this.state.searchedNo }</p>

                    <p><b>Street: </b>{ this.state.searchedStreetName }</p>

                    <p><b>City: </b>{ this.state.searchedCity }</p>

                    <p><b>District: </b>{ this.state.searchedDistrict }</p>

                    <p><b>Province: </b>{ this.state.searchedProvince }</p>

                    <p><b>Assigned Lawyer ID: </b>{ this.state.searchedLawyerId }</p>

                    <p><b>Assigned Seller ID: </b>{ this.state.searchedSellerId }</p>

                </div>
                
            </div>
        );
    }
}

export default SearchDeed;
