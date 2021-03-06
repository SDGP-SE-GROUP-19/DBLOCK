import React, { Component } from "react";
import './ChangeLawSel.css'
import changeLawyerIcon from "./Images/transfer.png";

class ChangeLawSel extends Component {

    constructor(props) {

        super(props);

        this.state = {

            emailAlert: "",

            web3: this.props.web3PropFromNav,
            accounts: this.props.accountsPropFromNav,
            contract: this.props.contractPropFromNav,

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

            return <div>Loading Web3, accounts, and contract to change lawyer and seller...</div>;
        }

        return (
            // holds the data which describes about the page
            <div className="ChangeLawSel">
                <div className="changeLawSel-glass">
                <div className="changeLawyer-topic">
                    <h2 className="changeLawyer-heading">Change Lawyer And Owner</h2>
                    <img src={changeLawyerIcon} alt="Change Lawyer Icon" className="changeLawyer-icon" />
                </div>


                {/* The form related to the change in lawyer and owner page */}
                <div className="changeLawyer-container">
                    <form className="changeLawyer-form" onSubmit={this.handleSubmit}>

                        <div className="deedId">
                            <label className="changeLawyer-label" htmlFor="deedId">Deed ID:</label>
                            <input className="changeLawyer-input" type="number" min="0" id="deedId" value={this.state.deedId} onChange={this.handleDeedIdChange} />
                        </div>

                        <div className="newLawyerEmail">
                            <label className="changeLawyer-label" htmlFor="newLawyerEmail">New Lawyer's Email:</label>
                            <input className="changeLawyer-input" type="text" id="newLawyerEmail" value={this.state.newLawyerEmail} onChange={this.handleLawyerEmailChange} />
                        </div>

                        <div className="newSellerEmail">
                            <label className="changeLawyer-label" htmlFor="newSellerEmail">New Owner's Email:</label>
                            <input className="changeLawyer-input"  type="text" id="newSellerEmail" value={this.state.newSellerEmail} onChange={this.handleSellerEmailChange} />
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

                        {/* button to clear fields of the page by refreshing */}
                        <div>
                        <form className="clear-button" onSubmit={ this.refreshpage }>
                            <button className="changeLawyer-clear">Clear</button>
                        </form>
                        </div>

                        <div>
                            <input type="submit" value="Submit" className="changeLawyer-submit" />
                        </div>

                    

                    </form>

                </div>
                </div>

            </div>
        );
    }
}

export default ChangeLawSel;
