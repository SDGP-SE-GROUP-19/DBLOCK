import React, { Component } from "react";
import './SearchDeed.css';
import searchDeedIcon from "./Images/searchdeed.png";
class SearchDeed extends Component {

    constructor(props) {

        super(props);

        this.state = {

            deedIndexAlert: "",

            searchedNo: "",
            ipfsHash:"",
            searchedStreetName: "",
            searchedCity: "",
            searchedDistrict: "",
            searchedProvince: "",
            searchedLawyerId: 0,
            searchedLawyerEmail: "",
            searchedSellerId: 0,
            searchedSellerEmail: "",

            web3: this.props.web3PropFromNav,
            accounts: this.props.accountsPropFromNav,
            contract: this.props.contractPropFromNav,

            searchingDeedId: 0
        }

        // Binding for scope
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearchingDeedIdChange = this.handleSearchingDeedIdChange.bind(this);
    }

    handleSearchingDeedIdChange(event) {

        // Set the state searchingDeedId with input
        this.setState({ searchingDeedId: event.target.value });
    }

    async handleSubmit(event) {

        // prevent auto refresh on submit
        event.preventDefault();
    
        // Initialize contract variables from state
        const { contract, searchingDeedId } = this.state;

        // getting the deed count
        const deedCount = await contract.methods.getDeedCount().call();

        if (searchingDeedId >= parseInt(deedCount))
        {
            // setting the state with relevant info
            this.setState({

                deedIndexAlert: "INVALID DEED INDEX!",

                searchedNo: "",
                ipfsHash: "",
                searchedStreetName: "",
                searchedCity: "",
                searchedDistrict: "",
                searchedProvince: "",
                searchedLawyerId: -1,
                searchedLawyerEmail: "", 
                searchedSellerId: -1,
                searchedSellerEmail: ""
            });
        }
        else
        {
            // get the relevant deed data
            const deedNoResponse = await contract.methods.getDeedNo(searchingDeedId).call();
            const deedStreetResponse = await contract.methods.getDeedStreetName(searchingDeedId).call();
            const deedCityResponse = await contract.methods.getDeedCity(searchingDeedId).call();
            const deedDistrictResponse = await contract.methods.getDeedDistrict(searchingDeedId).call();
            const deedProvinceResponse = await contract.methods.getDeedProvince(searchingDeedId).call();
            const deedLawyerResponse = await contract.methods.getLawyerIdOfDeed(searchingDeedId).call();
            const deedSellerResponse = await contract.methods.getSellerIdOfDeed(searchingDeedId).call();
            const ipfsHash = await contract.methods.getHashFromDeed(searchingDeedId).call();

            // get lawyer and seller emails
            const lawyerEmailVar = await contract.methods.getLawyerEmail(deedLawyerResponse).call();
            const sellerEmailVar = await contract.methods.getSellerEmail(deedSellerResponse).call();

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

                deedIndexAlert: "",

                searchedNo: deedNoResponse,
                ipfsHash: ipfsHash,
                searchedStreetName: deedStreetResponse,
                searchedCity: deedCityResponse,
                searchedDistrict: deedDistrictResponse,
                searchedProvince: deedProvinceResponse,
                searchedLawyerId: deedLawyerResponse,
                searchedLawyerEmail: lawyerEmailVar,
                searchedSellerId: deedSellerResponse,
                searchedSellerEmail: sellerEmailVar
            });
        }
    }

    render() {

        if (!this.state.web3) {

            return <div>Loading Web3, accounts, and contract for search deed...</div>;
        }

        return (
            // describes about the search deed page
            <div className="SearchDeed">
                <div className="searchDeed-glass">
                    <div className="searchDeed-topic">
                    <h2 className="searchDeed-heading">Deed Search</h2>
                    <img src={searchDeedIcon} alt="Search Deed Icon" className="searchDeed-icon"/>

                    <form className="deedIdSearch" onSubmit={ this.handleSubmit }>

                        <label className="DeedIdtext">Deed ID:</label>
                        {/* asking for user to enter deed id to display deed details */}
                        <input type="number" min="0" id="deedid" value={ this.state.searchingDeedId } onChange={ this.handleSearchingDeedIdChange } required/>
                        {/* Error handeling of search deed */}
                        <br></br>
                        <br></br>
                        <br></br>
                        <div>{ this.state.deedIndexAlert }</div>
                        <br></br>

                        <div>
                            <input type="submit" value="Submit" className="searchDeed-button"/>
                        </div>
                    </form>
                </div>
                 

                

                <div className="searchDeed-container">

                    <form className="searchDeed-form">
                    {/* container which displays search deed data */}
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
                    <p><b>Assigned Lawyer ID: </b>{ this.state.searchedLawyerId } ( { this.state.searchedLawyerEmail } )</p>
                    </div>

                    <div className="selleridDS">
                    <p><b>Assigned Seller ID: </b>{ this.state.searchedSellerId } ( { this.state.searchedSellerEmail } )</p>
                    </div>

                    <button
                        type="button"
                        className="searchDeedImage-button"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `https://ipfs.io/ipfs/${this.state.ipfsHash}`;
                        }}>Deed image
                    </button>

                    </form>

                </div>
                </div>
                
            </div>
        );
    }
}

export default SearchDeed;

