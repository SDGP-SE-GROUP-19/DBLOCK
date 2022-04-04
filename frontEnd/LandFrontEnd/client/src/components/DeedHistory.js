import React, {Component} from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";

class DeedHistory extends Component {

    constructor(props) {

        super(props);

        this.state = {

            storageValue: 0, // Deed ID
            addressAlert: "", // will change if the deed does not exist

            web3: null,
            accounts: null,
            contract: null,

            newNo: "",
            newStreetName: "",
            newCity: "",
            newDistrict: "",
            newProvince: "",

            historyArray: null
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
            });
        }
        else
        {
            console.log("OK");

            let historyArrayVar = ["stringarray"];
            //historyLimit = await contract.methods.

            //for(var i = 0; i <)
        }
    }

    render() {
        if (!this.state.web3) {

            return <div>Loading Web3, accounts, and contract...</div>;
        }

        return (
            <div className="DeedHistory">
                <form onSubmit={this.handleSubmit}>
                    <fieldset className="getDeedInfo">

                        {/* takes user input to search for a deed */}
                        <label htmlFor="no">Address No:</label>
                        <input type="text" id="no" value={this.state.newNo} onChange={this.handleNumberChange.bind(this)} required />

                        <label htmlFor="streetname">Street:</label>
                        <input type="text" id="streetname" value={this.state.newStreetName} onChange={this.handleStreetChange.bind(this)} required />

                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" value={this.state.newCity} onChange={this.handleCityChange.bind(this)} required />

                        <label htmlFor="district">District:</label>
                        <input type="text" id="district" value={this.state.newDistrict} onChange={this.handleDistrictChange.bind(this)} required />

                        <label htmlFor="province">Province:</label>
                        <input type="text" id="province" value={this.state.newProvince} onChange={this.handleProvinceChange.bind(this)} required />

                        <div className="addressalert">{this.state.addressAlert}</div>

                        <div className="btn">
                            <input type="submit" value="Submit" className="submitSD2" />
                        </div>

                    </fieldset>
                </form>
            </div>
        );
    }
}

export default DeedHistory;