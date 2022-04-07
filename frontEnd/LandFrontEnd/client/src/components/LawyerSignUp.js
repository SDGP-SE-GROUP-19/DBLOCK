import React, {Component} from "react";
import './LawyerSignUp.css'
import lawyer from "./Images/lawyer.png"

class LawyerSignUp extends Component {

    constructor(props) {

        super(props);

        this.state = {

            alertMessage: "",
            lawyerCount: 0,

            web3: this.props.web3PropFromNav,
            accounts: this.props.accountsPropFromNav,
            contract: this.props.contractPropFromNav,

            enteredLawyerName: "",
            enteredLawyerNic: "",
            enteredLawyerRegNo: "",
            enteredLawyerEmail: "",
            enteredLawyerTelNo: 0
        }

        // scope binding
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNicChange = this.handleNicChange.bind(this);
        this.handleRegNoChange = this.handleRegNoChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleTelNoChange = this.handleTelNoChange.bind(this);
    }

    handleNameChange(event) {

        // Set the state enteredLawyerName with input
        this.setState({ enteredLawyerName: event.target.value });
    }

    handleNicChange(event) {

        // Set the state enteredLawyerNic with input
        this.setState({ enteredLawyerNic: event.target.value });
    }

    handleRegNoChange(event) {

        // Set the state enteredLawyerRegNo with input
        this.setState({ enteredLawyerRegNo: event.target.value });
    }

    handleEmailChange(event) {

        // Set the state enteredLawyerEmail with input
        this.setState({ enteredLawyerEmail: event.target.value });
    }

    handleTelNoChange(event) {

        // Set the state enteredLawyerTelNo with input
        this.setState({ enteredLawyerTelNo: event.target.value });
    }

    async handleSubmit(event) {

        // prevent auto refresh on submit
        event.preventDefault();

        // Initialize account and contract variables from state
        const { accounts, contract } = this.state;

        // get the lawyer id by searching the lawyer's email
        const lawyerId = await contract.methods.findLawyerByEmail(this.state.enteredLawyerEmail).call();

        if (parseInt(lawyerId) === -1)
        {
            // Calling registerLawyer method from the smart contract
            await contract.methods.registerLawyer(
                this.state.enteredLawyerName,
                this.state.enteredLawyerNic,
                this.state.enteredLawyerRegNo,
                this.state.enteredLawyerEmail,
                this.state.enteredLawyerTelNo
            ).send({ from: accounts[0] });

            // get the number of lawyers added so far fron the blockchain using getLawyerCount method in smart contract
            const lawyerCountVar = await contract.methods.getLawyerCount().call();

            // set the state with the new lawyer count
            this.setState({ lawyerCount: lawyerCountVar, alertMessage: "" });
        }
        else
        {
            this.setState({ alertMessage: "Email already exists!" });
            console.log("Email already exists!");
        }
    }

    render() {

        if (!this.state.web3) {

            return <div>Loading Web3, accounts, and contract for lawyer sign up...</div>;
        }

        return (
            // holds data which describes about the lawyer sign up page
            <div className="LawyerSignUp">
                <div className="headingLS">
                    <h2 className="topicLS">Lawyer Sign Up</h2>
                    <img src={lawyer} alt="lawyer" className="lawyer"/>
                </div>

                {/* Displays the current amount of lawyers */}
                    <div className="lawyercount">Lawyer Count: { this.state.lawyerCount }</div>

                {/* The form related to signing up a lawyer to the blockchain */}
                <div className="containerLS">
                    <form className="formLS" onSubmit={ this.handleSubmit }>

                    <div className="nameLS">
                    <label htmlFor="name">Name:</label>
                    <input className="inputLS" type="text" id="name" value={ this.state.enteredLawyerName } onChange={ this.handleNameChange } required/>
                    </div>

                    <div className="nicLS">
                    <label htmlFor="nic">NIC:</label>
                    <input className="inputLS" type="text" minLength="10"  maxLength="12" id="nic" value={ this.state.enteredLawyerNic } onChange={ this.handleNicChange } required/>
                    </div>

                    <div className="registrationLS">
                    <label htmlFor="regno">Registration Number:</label>
                    <input className="inputLS" type="text" id="regno" value={ this.state.enteredLawyerRegNo } onChange={ this.handleRegNoChange } required/>
                    </div>

                    <div className="emailLS">
                    <label htmlFor="email">Email:</label>
                    <input className="inputLS" type="email" id="email" value={ this.state.enteredLawyerEmail } onChange={ this.handleEmailChange } required/>
                    <div className="emailval">{ this.state.alertMessage }</div>
                    </div>

                    <div className="telephoneLS">
                    <label htmlFor="telNo">Telephone:</label>
                    <input className="inputLS" type="number" min="0" id="telNo" value={ this.state.enteredLawyerTelNo } onChange={ this.handleTelNoChange } required/>
                    </div>

                    <div>
                        <input type="submit" value="Submit" className="buttonLS"/>
                    </div>

                    <div>
                        <form className="refresh" onSubmit={ this.refreshpage }>
                        <button className="refreshbtnLS">Clear Form</button>
                        </form>
                    </div>

                </form>

                </div>
            </div>
        );
    }
}

export default LawyerSignUp;
