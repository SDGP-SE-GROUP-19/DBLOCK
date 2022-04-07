import React, {Component} from "react";

class DeedHistory extends Component {

    constructor(props) {

        super(props);

        this.state = {

            storageValue: 0, // Deed ID
            addressAlert: "", // will change if the deed does not exist

            web3: this.props.web3PropFromNav,
            accounts: this.props.accountsPropFromNav,
            contract: this.props.contractPropFromNav,

            newNo: "",
            newStreetName: "",
            newCity: "",
            newDistrict: "",
            newProvince: "",

            historyArray: null
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
            });
        }
        else
        {
            console.log("OK");

            let deedIdFromHistory = -1;
            let historyArrayVar = ["History is empty"];
            let historyArrayCounter = 0;
            let oldLawyerId = -1;
            let oldLawyerEmail = "none";
            let oldSellerId = -1;
            let oldSellerEmail = "none";
            let dateStamp = "0/0/0";
            let timeStamp = "00:00";
            const historyLimit = await contract.methods.getHistoryCount().call();

            for(var i = 0; i < parseInt(historyLimit); i++)
            {
                deedIdFromHistory = await contract.methods.getDeedIdFromHistory(i).call();

                if (parseInt(deedIndex) === parseInt(deedIdFromHistory))
                {
                    oldLawyerId = await contract.methods.getOldLawyerIdFromHistory(i).call();
                    oldSellerId = await contract.methods.getOldSellerIdFromHistory(i).call();

                    oldLawyerEmail = await contract.methods.getLawyerEmail(oldLawyerId).call();
                    oldSellerEmail = await contract.methods.getSellerEmail(oldSellerId).call();

                    dateStamp = await contract.methods.getDateStampFromHistory(i).call();
                    timeStamp = await contract.methods.getTimeStampFromHistory(i).call();

                    historyArrayVar[historyArrayCounter] = (
                        deedIdFromHistory.toString() + 
                        " - L:" + oldLawyerEmail + 
                        " S:" + oldSellerEmail + 
                        " Date:" + dateStamp + 
                        " Time:" + timeStamp
                    );
                    historyArrayCounter++;  
                }
            }

            this.setState({ historyArray: historyArrayVar });
        }
    }

    render() {
        if (!this.state.web3) {

            return <div>Loading Web3, accounts, and contract for deed history...</div>;
        }

        if (this.state.historyArray === null)
        {
            return (
                <div className="DeedHistory">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset className="getDeedInfo">

                            {/* takes user input to search for a deed */}
                            <label htmlFor="no">Address No:</label>
                            <input type="text" id="no" value={this.state.newNo} onChange={this.handleNumberChange} required />

                            <label htmlFor="streetname">Street:</label>
                            <input type="text" id="streetname" value={this.state.newStreetName} onChange={this.handleStreetChange} required />

                            <label htmlFor="city">City:</label>
                            <input type="text" id="city" value={this.state.newCity} onChange={this.handleCityChange} required />

                            <label htmlFor="district">District:</label>
                            <input type="text" id="district" value={this.state.newDistrict} onChange={this.handleDistrictChange} required />

                            <label htmlFor="province">Province:</label>
                            <input type="text" id="province" value={this.state.newProvince} onChange={this.handleProvinceChange} required />

                            <div className="addressalert">{this.state.addressAlert}</div>

                            <div className="btn">
                                <input type="submit" value="Submit" className="submitSD2" />
                            </div>

                        </fieldset>
                    </form>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <ul>
                        {
                            this.state.historyArray.map(function(item, i){
                                return (<li key={i}>{item}</li>);
                            })
                        }
                    </ul>
                </div>
            );
        }
    }
}

export default DeedHistory;
