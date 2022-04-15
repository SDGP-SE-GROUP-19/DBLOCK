import React, {Component} from "react";
//import LandContract from "../contracts/Land.json";
//import getWeb3 from "../getWeb3";
//import AdminNavigator from "./AdminNavigator";
import './LawyerSignIn.css';
import LawyerNavigator from "./LawyerNavigator";
import profile from "./Images/admin.png";

class LawyerSignIn extends Component {

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

        // Binding for scope
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnteredPasswordChange = this.handleEnteredPasswordChange.bind(this);
        this.handleEnteredUsernameChange = this.handleEnteredUsernameChange.bind(this);
    }

    // componentDidMount = async () => {

    //     try {
    //         // Get network provider and web3 instance.
    //         const web3 = await getWeb3();

    //         // Use web3 to get the user's accounts.
    //         const accounts = await web3.eth.getAccounts();

    //         // Get the contract instance.
    //         const networkId = await web3.eth.net.getId();
    //         const deployedNetwork = LandContract.networks[networkId];
    //         const instance = new web3.eth.Contract(
    //         LandContract.abi,
    //         deployedNetwork && deployedNetwork.address,
    //         );

    //         // Set web3, accounts, and contract to the state, and then proceed with an
    //         // example of interacting with the contract's methods.
    //         this.setState({ web3, accounts, contract: instance });

    //     } catch (error) {

    //         // Catch any errors for any of the above operations.
    //         alert(
    //         `Failed to load web3, accounts, or contract. Check console for details.`,
    //         );

    //         console.error(error);
    //     }
    // };

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
        const lawyeridemail = await contract.methods.findLawyerByEmail(this.state.enteredUsername).call();

        // get the actual lawyer username from the blockchain
        //const actualLawyerusername = await contract.methods.getLawyerEmail(lawyeridemail).call();
        //this.setState({ actualUsername: actualLawyerusername });

        

        // just showing the actual password from the state. MUST BE REMOVED ! 
        //console.log("Password from state " + this.state.actualPassword); // remove after testing

        // compare the entered username and the password with the actual username and the password
        if(lawyeridemail > -1) {

            console.log("Username is correct");

            // get the actual lawyer pass from the blockchain
            const actualLawyerPassword = await contract.methods.getLawyerPassword(lawyeridemail).call();
            const actualLawyerusername = await contract.methods.getLawyerEmail(lawyeridemail).call();
            this.setState({ actualPassword: actualLawyerPassword, actualUsername: actualLawyerusername });

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

            // return ( <AdminNavigator  web3Prop={ web3Var } contractProp={ contractVar } accountsProp={ accountsVar }/> );
            return (
                // <div>Next lawyer page...</div>
                <LawyerNavigator web3Prop={ web3Var } contractProp={ contractVar } accountsProp={ accountsVar }/>
            );
        }
        else {
            return (
                <div className="LawyerSignIn">
                    <div className="LawyerSignIn-glass">
                        <div className="LawyerSignIn-topic">
                            <h2 className="LawyerSignIn-heading">Lawyer Log In</h2> 
                        </div>

                        <img src={profile} alt="profile" className="profile"/>
                    
                        <div className="LawyerSignIn-container"></div>
                        <form className="LawyerSignIn-form" onSubmit={ this.handleSubmit }>

                            <div className="lawyerpw">
                            <label className="LawyerSignIn-label">Enter Email: </label>
                                <input className="LawyerSignIn-input" type="text" placeholder="EMAIL" value={ this.state.enteredUsername } onChange={ this.handleEnteredUsernameChange } />
                            </div>

                            <div className="lawyerpw">
                            <label className="LawyerSignIn-label">Enter Password:</label>
                                <input className="LawyerSignIn-input" type="password" placeholder="PASSWORD" value={ this.state.enteredPassword } onChange={ this.handleEnteredPasswordChange } />
                            </div>

                            <div>
                                <input type="submit" value="Check" className="LawyerSignIn-button" />
                            </div>

                        </form>

                    </div>
        
                </div>
            );
        }
    }
}

export default LawyerSignIn;