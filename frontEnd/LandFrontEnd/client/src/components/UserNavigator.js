import React, { Component } from "react";
import PageNotFound from "./PageNotFound";
import UserHome from "./UserHome";
import DeedHistory from "./DeedHistory";
import DeedsOfUser from "./DeedsOfUser";
import './UserNavigator.css';
import { Routes, Route, Link } from 'react-router-dom';



class UserNavigator extends Component {

    constructor(props)
    {
        super(props);

        this.state = {

            web3: this.props.web3Prop,
            accounts: this.props.accountsProp,
            contract: this.props.contractProp,

            loginMessage: this.props.adminLoginMessageFromSignIn
        }
    }

    render() {
        const web3Var = this.state.web3;
        const contractVar = this.state.contract;
        const accountsVar = this.state.accounts;

        if (!this.state.web3) {

            return <div>Loading Web3, accounts, and contract...</div>;
        }

        return (
            <div>
                {/* <h1>{ this.state.loginMessage }</h1> */}
                {/* The navigation bar that routes through pages on a click of a button */}
                <nav className="UserNavigator">
                    <ul className="nav1">
                    <li className="Navbtn"><Link to="/" className="a" style={{ textDecoration: 'none', color: 'white'}}>Home</Link></li>
                    <li className="Navbtn"><Link to="/DeedsOfUser" className="a" style={{ textDecoration: 'none', color: 'white'}}>Deeds Assigned to User</Link></li>
                    <li className="Navbtn"><Link to="/DeedHistory" className="a" style={{ textDecoration: 'none', color: 'white'}}>Deed History</Link></li>
                    </ul>
                </nav>

                {/* The naming and defining of the route paths */}
                <Routes>
                    <Route path="/" element={ <UserHome/> }/>
                    <Route path="/DeedsOfUser" element={ <DeedsOfUser web3PropFromNav={ web3Var } contractPropFromNav={ contractVar } accountsPropFromNav={ accountsVar }/> }/>
                    <Route path="/DeedHistory" element={ <DeedHistory web3PropFromNav={ web3Var } contractPropFromNav={ contractVar } accountsPropFromNav={ accountsVar }/> }/>
                    <Route path="*" element={ <PageNotFound /> }/>
                </Routes>

            </div>
        );
    }
}

export default UserNavigator;
