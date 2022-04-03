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

    render() {

        return (
            <div className="AdminNavigator">
                {/* The navigation bar that routes through pages on a click of a button */}
                <nav className="navstyle">
                    <button className="Navbtn"><Link to="/" style={{ textDecoration: 'none', color: 'white'}}>Home</Link></button>
                    <button className="Navbtn"><Link to="/NewDeedForm" style={{ textDecoration: 'none', color: 'white'}}>New Land Deed</Link></button>
                    <button className="Navbtn"><Link to="/SearchDeed" style={{ textDecoration: 'none', color: 'white'}}>Search Deeds</Link></button>
                    <button className="Navbtn"><Link to="/SearchDeed2" style={{ textDecoration: 'none', color: 'white'}}>Search Deeds By Address</Link></button>
                    <button className="Navbtn"><Link to="/ChangeLawSel" style={{ textDecoration: 'none', color: 'white'}}>Change Lawyer And Owner</Link></button>
                    <button className="Navbtn"><Link to="/UserSignUp" style={{ textDecoration: 'none', color: 'white'}}>User Sign up</Link></button>
                    <button className="Navbtn"><Link to="/LawyerSignUp" style={{ textDecoration: 'none', color: 'white'}}>Lawyer Sign up</Link></button>
                    <button className="Navbtn"><Link to="/DeedHistory" style={{ textDecoration: 'none', color: 'white'}}>Deed History</Link></button>
                </nav>

                {/* The naming and defining of the route paths */}
                <Routes>
                    <Route path="/" element={ <AdminHome /> }/>
                    <Route path="/NewDeedForm" element={ <NewDeedForm /> }/>
                    <Route path="/SearchDeed" element={ <SearchDeed /> }/>
                    <Route path="/SearchDeed2" element={ <SearchDeed2 /> }/>
                    <Route path="/ChangeLawSel" element={ <ChangeLawSel /> }/>
                    <Route path="/UserSignUp" element={ <UserSignUp /> }/>
                    <Route path="/LawyerSignUp" element={ <LawyerSignUp /> }/>
                    <Route path="/DeedHistory" element={ <DeedHistory /> }/>
                    <Route path="*" element={ <PageNotFound /> }/>
                </Routes>

            </div>
        );
    }
}

export default AdminNavigator;
