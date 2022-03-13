import React, {Component, useCallback} from "react";
import LandContract from "../contracts/Land.json";
import getWeb3 from "../getWeb3";
import AdminNavigator from "./AdminNavigator";
import './AdminSignIn.css';
import profile from "./Images/admin.png";

class AdminSignIn extends Component {

    constructor(props) {

        super(props);

        this.state = {

            web3: null,
            accounts: null,
            contract: null,

            enteredPassword: null,
            actualPassword: null
        }
    }

    componentDidMount = async () => {

        try {

            // Binding for scope
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleEnteredPasswordChange = this.handleEnteredPasswordChange.bind(this);

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

    handleEnteredPasswordChange(event) {

        // Set the state enteredPassword with input
        this.setState({ enteredPassword: event.target.value });
    }

    async handleSubmit(event) {

        // prevent auto refresh on submit
        event.preventDefault();

        // Initialize account and contract variables from state
        const { contract } = this.state;

        // get the actual admin pass from the blockchain
        const actualAdminPassword = await contract.methods.getAdminPassword().call();
        this.setState({ actualPassword: actualAdminPassword });

        // just showing the actual password from the state. MUST BE REMOVED ! 
        //console.log("Password from state " + this.state.actualPassword); // remove after testing

        // compare the entered password with the actual password
        if (this.state.enteredPassword === actualAdminPassword) {

            console.log("Password is correct");
        }
        else
        {
            console.log("Incorrect password");
        }
    }

    render() {

        if (!this.state.web3) {

            return <div>Loading Web3, accounts, and contract...</div>;
        }

        if ((this.state.actualPassword === this.state.enteredPassword))
        {
            return <AdminNavigator />;
        }
        else
        {
            return (
                <div className="AdminSignIn">
    
                    <div className="sub-main">
    
                        <form onSubmit={ this.handleSubmit }>
    
                            <div className="img">
                                <div className="container-image">
                                    <img src={profile} alt="profile" className="profile"/>
                                </div>
                            </div>
    
                            <div className="admin-name">
                                <p>ADMIN LOGIN</p>
                            </div>
    
                            <div className="password">
                                <input type="text" placeholder="PASSWORD" className="PASSWORD" value={ this.state.enteredPassword } onChange={ this.handleEnteredPasswordChange.bind(this) } />
                            </div>
    
                            <div className="button-holder">
                                <input type="submit" value="Check" className="button" />
                            </div>
    
                        </form>
    
                    </div>
          
                </div>
            );
        }
    }
}

export default AdminSignIn;
