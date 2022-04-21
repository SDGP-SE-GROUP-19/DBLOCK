import React, {Component} from "react";
//import LandContract from "../contracts/Land.json";
//import getWeb3 from "../getWeb3";
//import AdminNavigator from "./AdminNavigator";
import './UserSignIn.css';
import profile from "./Images/admin.png";
import UserNavigator from "./UserNavigator";

class UserSignIn extends Component {

    constructor(props) {

        super(props);

        this.state = {

            web3: this.props.web3Prop,
            accounts: this.props.accountsProp,
            contract: this.props.contractProp,

            enteredPassword: "",
            actualPassword: "actualPassword",
            enteredUsername:"",
            actualUsername:""
        }

        // Binding  for scope
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnteredPasswordChange = this.handleEnteredPasswordChange.bind(this);
        this.handleEnteredUsernameChange = this.handleEnteredUsernameChange.bind(this);
    }


    handleEnteredPasswordChange(event) {

        // Set the state enteredPassword with input
        this.setState({ enteredPassword: event.target.value });
    }

    handleEnteredUsernameChange(event) {

        // Set the state enteredPassword with input
        this.setState({ enteredUsername: event.target.value });
    }   

    async handleSubmit(event) {

        // prevent auto refresh on submit
        event.preventDefault();

        // Initialize account and contract variables from state
        const { contract } = this.state;
        const selleridemail = await contract.methods.findSellerByEmail(this.state.enteredUsername).call();

        // just showing the actual password from the state. MUST BE REMOVED ! 
        //console.log("Password from state " + this.state.actualPassword); // remove after testing

        // compare the entered username with the actual username
        if(selleridemail > -1) {

            console.log("Username is correct");

            // get the actual seller pass from the blockchain
            const actualUserPassword = await contract.methods.getSellerPassword(selleridemail).call();
            // get the actual seller username from the blockchain
            const actualUserusername = await contract.methods.getSellerEmail(selleridemail).call();
            this.setState({ actualPassword: actualUserPassword, actualUsername: actualUserusername });

            // compare the entered password with the actual password
            if (this.state.enteredPassword === this.state.actualPassword) {

                console.log("Password is correct");
            }
            else {
                console.log("Incorrect password");
            }
        }
        else {
            console.log("Incorrect username");
        }
        
    }

    render() {
        if (!this.state.web3) {

            return <div>Loading Web3, accounts, and contract for lawyer sign in...</div>;
        }


        if (this.state.enteredPassword === this.state.actualPassword && this.state.enteredUsername === this.state.actualUsername)
        {
            // const adminLoginMessage = "Lawyer login successfull!";
            const web3Var = this.state.web3;
            const contractVar = this.state.contract;
            const accountsVar = this.state.accounts;

            //return ( <AdminNavigator  web3Prop={ web3Var } contractProp={ contractVar } accountsProp={ accountsVar }/> );
            return (
                <UserNavigator  web3Prop={ web3Var } contractProp={ contractVar } accountsProp={ accountsVar }/>
            );
        }
        else {
            return (
                <div className="UserSignIn">
                    <div className="UserSignIn-glass">
                        <div className="UserSignIn-topic">
                            <h2 className="UserSignIn-heading">User Log In</h2> 
                        </div>

                        <img src={profile} alt="profile" className="profile"/>

                        <div className="UserSignIn-container">
                        <form className="UserSignIn-form" onSubmit={ this.handleSubmit }> 
                        
                          
                            <div className="userpw">
                            <label className="UserSignIn-label">Enter Email: </label>
                                <input className="UserSignIn-input" type="text" placeholder="EMAIL" value={ this.state.enteredUsername } onChange={ this.handleEnteredUsernameChange } />
                            </div>

                            <div className="userpw">
                            <label className="UserSignIn-label">Enter Password:</label>
                                <input className="UserSignIn-input" type="password" placeholder="PASSWORD" value={ this.state.enteredPassword } onChange={ this.handleEnteredPasswordChange } />
                            </div>

                            <div>
                                <input type="submit" value="Check" className="UserSignIn-button" />
                            </div>

                        </form>

                    </div>
                    </div>
        
                </div>
            );
        }
    }
}

export default UserSignIn;