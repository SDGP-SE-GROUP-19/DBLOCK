import React, {Component} from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";
import './LawyerSignUp.css'
import lawyer from "./Images/lawyer.png"

class LawyerSignUp extends Component {

    constructor(props) {

        super(props);

        this.state = {

            alertMessage: "",
            lawyerCount: 0,

            web3: null,
            accounts: null,
            contract: null,

            enteredLawyerName: "",
            enteredLawyerNic: "",
            enteredLawyerRegNo: "",
            enteredLawyerEmail: "",
            enteredLawyerTelNo: 0
        }
    }

    componentDidMount = async () => {

        try {
    
          // Binding for scope
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleNameChange = this.handleNameChange.bind(this);
          this.handleNicChange = this.handleNicChange.bind(this);
          this.handleRegNoChange = this.handleRegNoChange.bind(this);
          this.handleEmailChange = this.handleEmailChange.bind(this);
          this.handleTelNoChange = this.handleTelNoChange.bind(this);
    
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

            return <div>Loading Web3, accounts, and contract...</div>;
        }

        return (
            <div className="LawyerSignUp">
                <div className="headingLS">
                    <h2 className="topicLS">Lawyer Sign Up</h2>
                    <img src={lawyer} alt="lawyer" className="lawyer"/>
                </div>

                    <div className="lawyercount">Lawyer Count: { this.state.lawyerCount }</div>

                <div className="containerLS">
                    <form className="formLS" onSubmit={ this.handleSubmit }>

                    <div className="nameLS">
                    <label htmlFor="name">Name:</label>
                    <input className="inputLS" type="text" id="name" value={ this.state.enteredLawyerName } onChange={ this.handleNameChange.bind(this) }/>
                    </div>

                    <div className="nicLS">
                    <label htmlFor="nic">NIC:</label>
                    <input className="inputLS" type="text" minLength="10"  maxLength="12" id="nic" value={ this.state.enteredLawyerNic } onChange={ this.handleNicChange.bind(this) }/>
                    </div>

                    <div className="registrationLS">
                    <label htmlFor="regno">Registration Number:</label>
                    <input className="inputLS" type="text" id="regno" value={ this.state.enteredLawyerRegNo } onChange={ this.handleRegNoChange.bind(this) }/>
                    </div>

                    <div className="emailLS">
                    <label htmlFor="email">Email:</label>
                    <input className="inputLS" type="email" id="email" value={ this.state.enteredLawyerEmail } onChange={ this.handleEmailChange.bind(this) }/>
                    <div className="emailval">{ this.state.alertMessage }</div>
                    </div>

                    <div className="telephoneLS">
                    <label htmlFor="telNo">Telephone:</label>
                    <input className="inputLS" type="number" min="0" id="telNo" value={ this.state.enteredLawyerTelNo } onChange={ this.handleTelNoChange.bind(this) }/>
                    </div>

                    <div>
                        <input type="submit" value="Submit" className="buttonLS"/>
                    </div>

                </form>

                </div>
            </div>
        );
    }
}

export default LawyerSignUp;
