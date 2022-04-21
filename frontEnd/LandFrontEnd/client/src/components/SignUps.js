import React, { Component } from "react";
import PageNotFound from "./PageNotFound";
import LawyerSignUp from "./LawyerSignUp";
import UserSignUp from "./UserSignUp";
import './SignUps.css';
import { Routes, Route, Link } from 'react-router-dom';
import SignUpsHome from "./SignUpsHome";



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
            
                <div className="SignUps">
                <div>
                    <button ><Link to="/LawyerSignUp" style={{ textDecoration: 'none', color: 'white'}}>Lawyer SignUp</Link></button>
                    <button ><Link to="/UserSignUp" style={{ textDecoration: 'none', color: 'white'}}>User Sign up</Link></button>
                    <button ><Link to="/" style={{ textDecoration: 'none', color: 'white'}}>Sign up home</Link></button>
                </div>

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
