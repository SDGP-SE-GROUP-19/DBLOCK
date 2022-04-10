import React, { Component } from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";
import AdminSignIn from "./AdminSignIn";
import LawyerSignIn from "./LawyerSignIn";
import UserSignIn from "./UserSignIn";
import './MainHomePage.css';
import LawyerSignUp from "./LawyerSignUp";
import UserSignUp from "./UserSignUp";

class SignupPages extends Component {

    constructor(props) {

        super(props);

        this.state = {

            web3: this.props.web3Prop,
            accounts: null,
            contract: null,

        
            navToLawyer: false,
            navToUser: false
        }

        // Binding for scope
        
        this.handleLawyerSubmit = this.handleLawyerSubmit.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
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


    async handleLawyerSubmit(event) {
        // prevent auto refresh on submit
        event.preventDefault();

        console.log("Nav => Lawyer");

        this.setState({
            
            navToLawyer: true,
            navToUser: false
        });
    }

    async handleUserSubmit(event) {
        // prevent auto refresh on submit
        event.preventDefault();

        console.log("Nav => User");

        this.setState({
            
            navToLawyer: false,
            navToUser: true
        });
    }
    
    render() {
        
        const navToLawyerVar = this.state.navToLawyer;
        const navToUserVar = this.state.navToUser;

        if (!this.state.web3) {

            return <div>Loading Web3, accounts, and contract for main page...</div>;
        }
        else
        {
            const web3Var = this.state.web3;
            const contractVar = this.state.contract;
            const accountsVar = this.state.accounts;

            if ((navToLawyerVar === false) && (navToUserVar === false))
            {
                return (
                    <div className="MainHomePage">
                        <form onSubmit={ this.handleLawyerSubmit }>
                            <input type="submit" value="Lawyer"/>
                        </form>
        
                        <form onSubmit={ this.handleUserSubmit }>
                            <input type="submit" value="User"/>
                        </form>
        
                    </div>
                );
            }

            
            else if ((navToLawyerVar === true) && (navToUserVar === false))
            {
                return (<LawyerSignUp web3Prop={ web3Var } contractProp={ contractVar } accountsProp={ accountsVar }/>);
            }
            else if ((navToLawyerVar === false) && (navToUserVar === true))
            {
                return (<UserSignUp web3Prop={ web3Var } contractProp={ contractVar } accountsProp={ accountsVar }/>);
            }
            else
            {
                return(
                    <div>
                        <p>Sign up Page Navigation Error!</p>
                        <ol>
                        
                            <li>navToLawyerVar - { navToLawyerVar }</li>
                            <li>navToUserVar - { navToUserVar }</li>
                        </ol>
                    </div>
                );
            }
        }
    }
}

export default SignupPages;