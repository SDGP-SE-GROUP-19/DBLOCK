import React, { Component } from "react";
import LawyerHome from "./LawyerHome";
import { Routes, Route, Link } from 'react-router-dom';
import PageNotFound from "./PageNotFound";
import './LawyerNavigator.css';

class LawyerNavigator extends Component {

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
        return(
            <div>
                <nav className="LawyerNavigator">
                    <ul className="nav">
                        <li className="Navbtn"><Link to="/" className="a" style={{ textDecoration: 'none', color: 'white'}}>LawyerHome</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={ <LawyerHome /> }/>
                    <Route path="*" element={ <PageNotFound /> } />
                </Routes>
            </div>
        );
    }
}

export default LawyerNavigator;
