import React, {Component} from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";

class LawyerSignUp extends Component {

    constructor(props) {

        super(props);

        this.state = {

            lawyerCount: 0,

            web3: null,
            accounts: null,
            contract: null,

            enteredLawyerName: "",
            enteredLawyerNic: "",
            enteredLawyerRegNo: "",
            enteredLawyerEmail: ""
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

    async handleSubmit(event) {

        // prevent auto refresh on submit
        event.preventDefault();

        // Initialize account and contract variables from state
        const { accounts, contract } = this.state;

        // Calling registerLawyer method from the smart contract
        await contract.methods.registerLawyer(
            this.state.enteredLawyerName,
            this.state.enteredLawyerNic,
            this.state.enteredLawyerRegNo,
            this.state.enteredLawyerEmail
        ).send({ from: accounts[0] });

        // get the number of lawyers added so far fron the blockchain using getLawyerCount method in smart contract
        const lawyerCountVar = await contract.methods.getLawyerCount().call();

        // set the state with the new lawyer count
        this.setState({ lawyerCount: lawyerCountVar });
    }

    render() {

        return (
            <div className="LawyerSignUp">

                <h2>Lawyer Sign Up</h2>

                <div>Lawyer Count: { this.state.lawyerCount }</div>

                <form onSubmit={ this.handleSubmit }>

                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={ this.state.enteredLawyerName } onChange={ this.handleNameChange.bind(this) }/>

                    <label htmlFor="nic">NIC:</label>
                    <input type="text" id="nic" value={ this.state.enteredLawyerNic } onChange={ this.handleNicChange.bind(this) }/>

                    <label htmlFor="regno">Registration Number:</label>
                    <input type="text" id="regno" value={ this.state.enteredLawyerRegNo } onChange={ this.handleRegNoChange.bind(this) }/>

                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" value={ this.state.enteredLawyerEmail } onChange={ this.handleEmailChange.bind(this) }/>

                    <div>
                        <input type="submit" value="Submit" />
                    </div>

                </form>

            </div>
        );
    }
}

export default LawyerSignUp;
