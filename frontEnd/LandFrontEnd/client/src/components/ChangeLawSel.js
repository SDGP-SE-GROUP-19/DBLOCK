import React, { Component } from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";
import './ChangeLawSel.css'
import transfer from "./Images/transfer.png";

class ChangeLawSel extends Component {

    constructor(props) {

        super(props);

        this.state = {

            emailAlert: "",

            web3: null,
            accounts: null,
            contract: null,

            oldLawyerTelNo: "",
            oldSellerTelNo: "",

            deedId: 0,
            newLawyerEmail: "",
            newSellerEmail: ""
        }

        // Binding for scope
        this.getDate = this.getDate.bind(this);
        this.getTime = this.getTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeedIdChange = this.handleDeedIdChange.bind(this);
        this.handleLawyerEmailChange = this.handleLawyerEmailChange.bind(this);
        this.handleSellerEmailChange = this.handleSellerEmailChange.bind(this);
    }

    componentDidMount = async () => {

        try {
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

    handleDeedIdChange(event) {

        // Set the state deedId with input
        this.setState({ deedId: event.target.value });
    }

    handleLawyerEmailChange(event) {

        // Set the state newLawyerId with input
        this.setState({ newLawyerEmail: event.target.value });
    }

    handleSellerEmailChange(event) {

        // Set the state newSellerId with input
        this.setState({ newSellerEmail: event.target.value });
    }

    getDate()
    {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        let date = (dd + '/' + mm + '/' + yyyy);

        return date;
    }

    getTime()
    {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        return time;
    }

    async handleSubmit(event) {

        // prevent auto refresh on submit
        event.preventDefault();

        // Initialize account and contract variables from state
        const { accounts, contract } = this.state;

        // get the new lawyer id by searching the lawyer's email
        const newLawyerId = await contract.methods.findLawyerByEmail(this.state.newLawyerEmail).call();

        // get the new seller id by searching the seller's email
        const newSellerId = await contract.methods.findSellerByEmail(this.state.newSellerEmail).call();

        // getting the deed count
        const deedCount = await contract.methods.getDeedCount().call();

        if (this.state.deedId >= parseInt(deedCount)) {
            console.log("Invalid deed ID!");
            this.setState({ emailAlert: "INVALID DEED ID DETECTED!" });
        }
        else {
            // get the current lawyer id and seller id
            const currentLawyerId = await contract.methods.getLawyerIdOfDeed(this.state.deedId).call();
            const currentSellerId = await contract.methods.getSellerIdOfDeed(this.state.deedId).call();

            // get the current lawyers and sellers phone number
            const currentLawyerTelNo = await contract.methods.getLawyerTelephoneNumber(currentLawyerId).call();
            const currentSellerTelNo = await contract.methods.getSellerTelephoneNo(currentSellerId).call();

            const currentLawyerTelNoString = ("0" + currentLawyerTelNo.toString());
            const currentSellerTelNoString = ("0" + currentSellerTelNo.toString());
            // const tpnumber = "0779184927"

            // convert to string and append zero
            console.log(
                "oldLawyerTelNoString: " + currentLawyerTelNoString +
                ", oldSellerTelNoString: " + currentSellerTelNoString
            );



            if ((parseInt(newLawyerId) === -1) || (parseInt(newSellerId) === -1)) {
                console.log("Invalid lawyer or seller email!");
                this.setState({ emailAlert: "INVALID EMAIL DETECTED!" });
            }
            else {
                // get the date
                const date = this.getDate();

                // get the time
                const time = this.getTime();

                // Calling addNewDeed method from the smart contract
                await contract.methods.changeDeedLawyerAndSeller(
                    this.state.deedId,
                    newLawyerId,
                    newSellerId,
                    date,
                    time
                ).send({ from: accounts[0] });

                // Log reaction
                console.log(
                    "Deed ID - ", this.state.deedId, ", ",
                    "new LID - ", newLawyerId, ", ",
                    "new SID - ", newSellerId, ", ",
                    "Date/Time Stamp - ", date, " ; ", time
                );

                this.setState({
                    emailAlert: "",
                    oldSellerTelNo: "SMS sent to the existing user under " + currentSellerTelNoString,
                    oldLawyerTelNo: "SMS sent to the existing lawyer under " + currentLawyerTelNoString
                });

                //set variables for send sms
                const to1 = currentSellerTelNoString;
                const to2 = currentLawyerTelNoString;
                const msg = "Hello, this message is sent you to notify that your land is in transfering process...";

                //try catch handling to fix the type error
                try {
                    //Sending SMS
                    const result = await fetch("http://textit.biz/sendmsg/index.php?id=94763358718&pw=1995" + "&to=" + [to1, to2] + "&text=" + msg);

                    const body = result.json();
                    console.log(body);
                }
                catch (e) {
                    //print the error in console
                    console.log(e);
                }
            }
        }
    }

    //define the structure of HTML
    render() {

        if (!this.state.web3) {

            return <div>Loading Web3, accounts, and contract...</div>;
        }

        return (
            // holds the data which describes about the page
            <div className="ChangeLawSel">
                <div className="headingC">
                    <h2 className="topicC">Change Lawyer And Owner</h2>
                    <img src={transfer} alt="transfer" className="transfer" />
                </div>


                {/* The form related to the change in lawyer and owner page */}
                <div className="containerC">
                    <form className="formC" onSubmit={this.handleSubmit}>

                        <div className="deedId">
                            <label htmlFor="deedId">Deed ID:</label>
                            <input className="inputC" type="number" min="0" id="deedId" value={this.state.deedId} onChange={this.handleDeedIdChange} />
                        </div>

                        <div className="newLawyerEmail">
                            <label htmlFor="newLawyerEmail">New Lawyer's Email:</label>
                            <input className="inputC" type="text" id="newLawyerEmail" value={this.state.newLawyerEmail} onChange={this.handleLawyerEmailChange} />
                        </div>

                        <div className="newSellerEmail">
                            <label htmlFor="newSellerEmail">New Owner's Email:</label>
                            <input className="inputC" type="text" id="newSellerEmail" value={this.state.newSellerEmail} onChange={this.handleSellerEmailChange} />
                        </div>

                        <br></br>
                        <h3 className="changelawyeremailalert">{this.state.emailAlert}</h3>
                        <br></br>

                        <div className="changelawyeremailalert">
                            {this.state.oldSellerTelNo}
                        </div>

                        <div className="changelawyeremailalert">
                            {this.state.oldLawyerTelNo}
                        </div>

                        <div>
                            <input type="submit" value="Submit" className="buttonC" />
                        </div>

                        {/* button to clear fields of the page by refreshing */}
                        <div>
                        <form className="refresh" onSubmit={ this.refreshpage }>
                            <button className="refreshbtnCLS">Clear Form</button>
                        </form>
                        </div>

                    </form>

                </div>

            </div>
        );
    }
}

export default ChangeLawSel;
