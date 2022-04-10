import React, { Component } from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";
import AdminSignIn from "./AdminSignIn";
import LawyerSignIn from "./LawyerSignIn";
import UserSignIn from "./UserSignIn";
import './MainHomePage.css';
import SignupPages from "./SignupNavigator";

class MainHomePage extends Component {

    constructor(props) {

        super(props);

        this.state = {

            web3: null,
            accounts: null,
            contract: null,

            navToAdmin: false,
            navToLawyer: false,
            navToUser: false,
            navTosignup: false
        }

        // Binding for scope
        this.handleAdminSubmit = this.handleAdminSubmit.bind(this);
        this.handleLawyerSubmit = this.handleLawyerSubmit.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
        this.handlesignupSubmit = this.handlesignupSubmit.bind(this);
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
    //handle submit for sign up button
    async handlesignupSubmit(event) {
        // prevent auto refresh on submit
        event.preventDefault();

        console.log("Nav => Signup");

        this.setState({

            navToAdmin: false,
            navToLawyer: false,
            navToUser: false,
            navTosignup: true
        });
    }
    //handle submit for admin button
    async handleAdminSubmit(event) {
        // prevent auto refresh on submit
        event.preventDefault();

        console.log("Nav => Admin");

        this.setState({
            navToAdmin: true,
            navToLawyer: false,
            navTosignup: false,
            navToUser: false
        });
    }
    //handle submit for lawyer button
    async handleLawyerSubmit(event) {
        // prevent auto refresh on submit
        event.preventDefault();

        console.log("Nav => Lawyer");

        this.setState({
            navToAdmin: false,
            navToLawyer: true,
            navTosignup: false,
            navToUser: false
        });
    }
    //handle submit for user button
    async handleUserSubmit(event) {
        // prevent auto refresh on submit
        event.preventDefault();
        console.log("Nav => User");

        this.setState({
            navToAdmin: false,
            navToLawyer: false,
            navTosignup: false,
            navToUser: true
        });
    }
    
    render() {
        const navToAdminVar = this.state.navToAdmin;
        const navToLawyerVar = this.state.navToLawyer;
        const navToUserVar = this.state.navToUser;
        const navTosignupVar = this.state.navTosignup;

        if (!this.state.web3) {

            return <div>Loading Web3, accounts, and contract for main page...</div>;
        }
        else
        {
            const web3Var = this.state.web3;
            const contractVar = this.state.contract;
            const accountsVar = this.state.accounts;

            if ((navToAdminVar === false) && (navToLawyerVar === false) && (navToUserVar === false) && (navTosignupVar === false))
            {
                return (
                    <div className="MainHomePage">
        
                        <form onSubmit={ this.handleAdminSubmit }>
                            <input type="submit" value="Admin"/>
                        </form>
        
                        <form onSubmit={ this.handleLawyerSubmit }>
                            <input type="submit" value="Lawyer"/>
                        </form>
        
                        <form onSubmit={ this.handleUserSubmit }>
                            <input type="submit" value="User"/>
                        </form>
                        <form onSubmit={ this.handlesignupSubmit }>
                            <input type="submit" value="signup"/>
                        </form>
        
                    </div>
                );
            }
            else if ((navToAdminVar === true) && (navToLawyerVar === false) && (navToUserVar === false) && (navTosignupVar === false))
            {
                return (<AdminSignIn web3Prop={ web3Var } contractProp={ contractVar } accountsProp={ accountsVar }/>);
            }
            else if ((navToAdminVar === false) && (navToLawyerVar === true) && (navToUserVar === false)&& (navTosignupVar === false))
            {
                return (<LawyerSignIn web3Prop={ web3Var } contractProp={ contractVar } accountsProp={ accountsVar }/>);
            }
            else if ((navToAdminVar === false) && (navToLawyerVar === false) && (navToUserVar === true)&& (navTosignupVar === false))
            {
                return (<UserSignIn web3Prop={ web3Var } contractProp={ contractVar } accountsProp={ accountsVar }/>);
            }
            else if ((navToAdminVar === false) && (navToLawyerVar === false) && (navToUserVar === false)&& (navTosignupVar === true))
            {
                return (<SignupPages web3Prop={ web3Var } contractProp={ contractVar } accountsProp={ accountsVar }/>);
            }
            else
            {
                return(
                    <div>
                        <p>Main Page Navigation Error!</p>
                        <ol>
                            <li>navToAdminVar - { navToAdminVar }</li>
                            <li>navToLawyerVar - { navToLawyerVar }</li>
                            <li>navToUserVar - { navToUserVar }</li>
                            <li>navTosignupVar - { navTosignupVar }</li>
                        </ol>
                    </div>
                );
            }
        }
    }
}

export default MainHomePage;