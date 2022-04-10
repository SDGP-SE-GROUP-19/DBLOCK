import React, { Component } from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";
import './SearchDeed.css';


class Userpage extends Component {

    constructor(props) {

        super(props);

        this.state = {
            

            deedIndexAlert: "",

            searchedNo: "",
            searchedStreetName: "",
            searchedCity: "",
            searchedDistrict: "",
            searchedProvince: "",
            searchedLawyerId: 0,
            searchedLawyerEmail: "",
            searcheduserId: "",
            searchedSellerEmail: "",
            deedcount: "",
            sellercount:"",

            web3: this.props.web3PropFromNav,
            accounts: this.props.accountsPropFromNav,
            contract: this.props.contractPropFromNav,

            historyArray: null,

            searchinguserId: 0
            
        }
    }

    componentDidMount = async () => {

        try {

            // Binding for scope
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleSearchinguserIdChange = this.handleSearchinguserIdChange.bind(this);

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

    handleSearchinguserIdChange(event) {

        // Set the state searchingDeedId with input
        this.setState({ searchinguserId: event.target.value });
    }


    async handleSubmit(event) {


        event.preventDefault();

        // Initialize account and contract variables from state
        const { contract } = this.state;
        const sellercount = await contract.methods.getSellersCount().call();
        this.setState({sellercount});



        if (this.state.searchinguserId >= parseInt(sellercount))
        {
            

            this.setState({ 
                addressAlert: "INVALID ADDRESS!",
                

            });
        }
        else
        {
            console.log("OK");

            let deedNoResponse= "";
            let deedStreetResponse= "";
            let deedCityResponse= "";
            let deeduseridresponse="";
            let deedDistrictResponse= "";
            let deedProvinceResponse= "";

            let historyArrayVar = ["History is empty"];
           

            
            
            let historyArrayCounter = 0;
            const deedcount = await contract.methods.getDeedCount().call();
            this.setState({deedcount});
            


            for (var i = 0; i < parseInt(deedcount); i++)
            {
                deeduseridresponse = await contract.methods.getSellerIdOfDeed(i).call();
                //value = parseInt(this.state.searchinguserId);

                if (parseInt(this.state.searchinguserId) === parseInt(deeduseridresponse))
                {
                    deedNoResponse = await contract.methods.getDeedNo(i).call();
                    deedStreetResponse = await contract.methods.getDeedStreetName(i).call();
                    deedCityResponse = await contract.methods.getDeedCity(i).call();
                    deedDistrictResponse = await contract.methods.getDeedDistrict(i).call();
                    deedProvinceResponse = await contract.methods.getDeedProvince(i).call();
                   



                    historyArrayVar[historyArrayCounter] = (
                        " user id  :  "+deeduseridresponse.toString() + 
                        " Street :  " + deedStreetResponse + 
                        " City  :  " + deedCityResponse + 
                        " District  :  " + deedDistrictResponse+
                        " Province  :  " + deedProvinceResponse
                    );
                    historyArrayCounter++;  
                }
            }

            this.setState({ historyArray: historyArrayVar });
        }
    }




        render() {
            if (!this.state.web3) {
    
                return <div>Loading Web3, accounts, and contract for user page...</div>;
            }
    
            if (this.state.historyArray === null)
            {
                return (

                    <div className="SearchDeed">
                    <div className="Searchuser">
    
                        <h2 className="topicDS">User Search</h2>
                        <form onSubmit={this.handleSubmit}>
    
                            <label className="UserIdtext">User ID:</label>
                            <input type="number" min="0" id="deedid" value={this.state.searchinguserId} onChange={this.handleSearchinguserIdChange.bind(this)} required />
                            <div>
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
    
                    </div>
                    </div>
                );
            }
            else
            {
                return (
                    <div>
                        <ol>
                            {
                                this.state.historyArray.map(function(item, i){
                                    return (<li key={i}>{item}</li>);
                                })
                            }
                        </ol>
                    </div>
                );
            }
        }
    }




export default Userpage;