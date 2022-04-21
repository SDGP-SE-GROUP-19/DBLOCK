import React, { Component } from "react";
import AdminHome from "./AdminHome";
import NewDeedForm from "./NewDeedForm";
import SearchDeed from "./SearchDeed";
import SearchDeed2 from "./SearchDeed2";
import ChangeLawSel from "./ChangeLawSel";
import PageNotFound from "./PageNotFound";
import UserSignUp from "./UserSignUp";
import LawyerSignUp from "./LawyerSignUp";
import DeedHistory from "./DeedHistory";
import './AdminNavigator.css';
import { Routes, Route, Link } from 'react-router-dom';


class AdminNavigator extends Component {

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
                {/* <nav className="navstyle">
                    <button className="Navbtn"><Link to="/" style={{ textDecoration: 'none', color: 'white'}}>Home</Link></button>
                    <button className="Navbtn"><Link to="/NewDeedForm" style={{ textDecoration: 'none', color: 'white'}}>New Land Deed</Link></button>
                    <button className="Navbtn"><Link to="/SearchDeed" style={{ textDecoration: 'none', color: 'white'}}>Search Deeds</Link></button>
                    <button className="Navbtn"><Link to="/SearchDeed2" style={{ textDecoration: 'none', color: 'white'}}>Search Deeds By Address</Link></button>
                    <button className="Navbtn"><Link to="/ChangeLawSel" style={{ textDecoration: 'none', color: 'white'}}>Change Lawyer And Owner</Link></button>
                    <button className="Navbtn"><Link to="/UserSignUp" style={{ textDecoration: 'none', color: 'white'}}>User Sign up</Link></button>
                    <button className="Navbtn"><Link to="/LawyerSignUp" style={{ textDecoration: 'none', color: 'white'}}>Lawyer Sign up</Link></button>
                    <button className="Navbtn"><Link to="/DeedHistory" style={{ textDecoration: 'none', color: 'white'}}>Deed History</Link></button>
                   
                </nav> */}

                <nav className="AdminNavigator">
                    <ul className="nav">
                        <li className="Navbtn"><Link to ="/" className="a" style={{ textDecoration: 'none', color: 'white'}}>Home</Link></li>
                        <li className="Navbtn"><Link to="/NewDeedForm" className="a" style={{ textDecoration: 'none', color: 'white',}}>New Land Deed</Link></li>
                        <li className="Navbtn"><Link to="/SearchDeed" className="a" style={{ textDecoration: 'none', color: 'white'}}>Search Deeds</Link></li>
                        <li className="Navbtn"><Link to="/SearchDeed2" className="a" style={{ textDecoration: 'none', color: 'white'}}>Search Deeds By Address</Link></li>
                        <li className="Navbtn"><Link to="/ChangeLawSel" className="a" style={{ textDecoration: 'none', color: 'white'}}>Change Lawyer And Owner</Link></li>
                        {/* <li className="Navbtn"><Link to="/UserSignUp" className="a" style={{ textDecoration: 'none', color: 'white'}}>User Sign up</Link></li> */}
                        {/* <li className="Navbtn"><Link to="/LawyerSignUp" className="a" style={{ textDecoration: 'none', color: 'white'}}>Lawyer Sign up</Link></li> */}
                        <li className="Navbtn"><Link to="/DeedHistory" className="a" style={{ textDecoration: 'none', color: 'white'}}>Deed History</Link></li>
                    </ul>
                </nav>

                {/* The naming and defining of the route paths */}
                <Routes>
                    <Route path="/" element={ <AdminHome /> }/>
                    <Route path="/NewDeedForm" element={ <NewDeedForm web3PropFromNav={ web3Var } contractPropFromNav={ contractVar } accountsPropFromNav={ accountsVar }/> }/>
                    <Route path="/SearchDeed" element={ <SearchDeed web3PropFromNav={ web3Var } contractPropFromNav={ contractVar } accountsPropFromNav={ accountsVar }/> }/>
                    <Route path="/SearchDeed2" element={ <SearchDeed2 web3PropFromNav={ web3Var } contractPropFromNav={ contractVar } accountsPropFromNav={ accountsVar }/> }/>
                    <Route path="/ChangeLawSel" element={ <ChangeLawSel web3PropFromNav={ web3Var } contractPropFromNav={ contractVar } accountsPropFromNav={ accountsVar }/> }/>
                    {/* <Route path="/UserSignUp" element={ <UserSignUp web3PropFromNav={ web3Var } contractPropFromNav={ contractVar } accountsPropFromNav={ accountsVar }/> }/> */}
                    {/* <Route path="/LawyerSignUp" element={ <LawyerSignUp web3PropFromNav={ web3Var } contractPropFromNav={ contractVar } accountsPropFromNav={ accountsVar }/> }/> */}
                    <Route path="/DeedHistory" element={ <DeedHistory web3PropFromNav={ web3Var } contractPropFromNav={ contractVar } accountsPropFromNav={ accountsVar }/> }/>
                    <Route path="*" element={ <PageNotFound /> }/>
                </Routes>

            </div>
        );
    }
}

export default AdminNavigator;
