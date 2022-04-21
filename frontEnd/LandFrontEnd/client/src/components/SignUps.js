import React, { Component } from "react";
import PageNotFound from "./PageNotFound";
import LawyerSignUp from "./LawyerSignUp";
import UserSignUp from "./UserSignUp";
import SignUpsHome from "./SignUpsHome";
import { Routes, Route, Link } from 'react-router-dom';
import './SignUps.css';


class SignUps extends Component {

    constructor(props)
    {
        super(props);

        this.state = {

            web3: this.props.web3Prop,
            accounts: this.props.accountsProp,
            contract: this.props.contractProp
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
            <nav className="SignUps">              
                <ul className="nav">
                    <li className="Navbtn"><Link to="/" className="a" style={{ textDecoration: 'none', color: 'white'}}>Sign Up</Link></li>
                    <li className="Navbtn"><Link to="/LawyerSignUp" className="a" style={{ textDecoration: 'none', color: 'white'}}>Lawyer Sign Up</Link></li>
                    <li className="Navbtn"><Link to="/UserSignUp" className="a" style={{ textDecoration: 'none', color: 'white'}}>User Sign Up</Link></li>
                </ul>
                </nav>

                {/* The naming and defining of the route paths */}
                <Routes>
                    <Route path="/" element={ <SignUpsHome /> }/>
                    <Route path="/LawyerSignUp" element={ <LawyerSignUp web3PropFromNav={ web3Var } contractPropFromNav={ contractVar } accountsPropFromNav={ accountsVar }/> }/>
                    <Route path="/UserSignUp" element={ <UserSignUp web3PropFromNav={ web3Var } contractPropFromNav={ contractVar } accountsPropFromNav={ accountsVar }/> }/>
                    <Route path="*" element={ <PageNotFound /> }/>
                </Routes>
            </div>
        );
    }
}

export default SignUps;
