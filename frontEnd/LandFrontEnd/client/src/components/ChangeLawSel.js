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
            newLawyerId: 0,
            newSellerId: 0
        }
    }

    componentDidMount = async () => {

        try {
    
          // Binding for scope
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleDeedIdChange = this.handleDeedIdChange.bind(this);
          this.handleLawyerIdChange = this.handleLawyerIdChange.bind(this);
          this.handleSellerIdChange = this.handleSellerIdChange.bind(this);
    
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

    handleLawyerIdChange(event) {

        // Set the state newLawyerId with input
        this.setState({ newLawyerId: event.target.value });
    }

    handleSellerIdChange(event) {

        // Set the state newSellerId with input
        this.setState({ newSellerId: event.target.value });
    }

    async handleSubmit(event) {

        // prevent auto refresh on submit
        event.preventDefault();
    
        // Initialize account and contract variables from state
        const { accounts, contract } = this.state;
    
        // Calling addNewDeed method from the smart contract
        await contract.methods.changeDeedBuyerAndSeller(
          this.state.deedId,
          this.state.newLawyerId,
          this.state.newSellerId
        ).send({ from: accounts[0] });
    
        // Log reaction
        console.log(
            "Deed ID - ", this.state.deedId, ", ",
            "new LID - ", this.state.newLawyerId, ", ",
            "new SID - ", this.state.newSellerId
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

                    <label htmlFor="newLawyerId">New Lawyer ID:</label>
                    <input type="number" id="newLawyerId" value={ this.state.newLawyerId } onChange={ this.handleLawyerIdChange.bind(this) }/>
                    <p></p>

                    <label htmlFor="newSellerId">New Owner ID:</label>
                    <input type="number" id="newSellerId" value={ this.state.newSellerId } onChange={ this.handleSellerIdChange.bind(this) }/>
                    <p></p>

                    <input type="submit" value="Submit"/>

                </form>

            </div>
        );
    }
}

export default ChangeLawSel;
