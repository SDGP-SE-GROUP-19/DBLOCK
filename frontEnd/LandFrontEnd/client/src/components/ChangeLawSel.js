import React, { Component } from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";

class ChangeLawSel extends Component {

    constructor(props) {

        super(props);

        this.state = {

            web3: null,
            accounts: null,
            contract: null,

            deedId: 0,
            newLawyerEmail: "",
            newSellerEmail: ""
        }
    }

    componentDidMount = async () => {

        try {
    
          // Binding for scope
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleDeedIdChange = this.handleDeedIdChange.bind(this);
          this.handleLawyerEmailChange = this.handleLawyerEmailChange.bind(this);
          this.handleSellerEmailChange = this.handleSellerEmailChange.bind(this);
    
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

    async handleSubmit(event) {

        // prevent auto refresh on submit
        event.preventDefault();
    
        // Initialize account and contract variables from state
        const { accounts, contract } = this.state;

        // get the lawyer id by searching the lawyer's email
        const newLawyerId = await contract.methods.findLawyerByEmail(this.state.newLawyerEmail).call();

        // get the seller id by searching the seller's email
        const newSellerId = await contract.methods.findSellerByEmail(this.state.newSellerEmail).call();
    
        // Calling addNewDeed method from the smart contract
        await contract.methods.changeDeedBuyerAndSeller(
          this.state.deedId,
          newLawyerId,
          newSellerId
        ).send({ from: accounts[0] });
    
        // Log reaction
        console.log(
            "Deed ID - ", this.state.deedId, ", ",
            "new LID - ", newLawyerId, ", ",
            "new SID - ", newSellerId
        );
    }

    render() {

        if (!this.state.web3) {

            return <div>Loading Web3, accounts, and contract...</div>;
        }

        return (
            <div className="ChangeLawSel">

                <h3>Change Lawyer And Owner</h3>

                <p></p>

                <form onSubmit={ this.handleSubmit }>

                    <label htmlFor="deedId">Deed ID:</label>
                    <input type="number" id="deedId" value={ this.state.deedId } onChange={ this.handleDeedIdChange.bind(this) }/>
                    <p></p>

                    <label htmlFor="newLawyerEmail">New Lawyer's Email:</label>
                    <input type="text" id="newLawyerEmail" value={ this.state.newLawyerEmail } onChange={ this.handleLawyerEmailChange.bind(this) }/>
                    <p></p>

                    <label htmlFor="newSellerEmail">New Owner's Email:</label>
                    <input type="text" id="newSellerEmail" value={ this.state.newSellerEmail } onChange={ this.handleSellerEmailChange.bind(this) }/>
                    <p></p>

                    <input type="submit" value="Submit"/>

                </form>

            </div>
        );
    }
}

export default ChangeLawSel;
