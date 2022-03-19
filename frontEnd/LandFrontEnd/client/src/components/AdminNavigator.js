import React, { Component } from "react";
import AdminHome from "./AdminHome";
import NewDeedForm from "./NewDeedForm";
import SearchDeed from "./SearchDeed";
import SearchDeed2 from "./SearchDeed2";
import ChangeLawSel from "./ChangeLawSel";
import PageNotFound from "./PageNotFound";
import UserSignUp from "./UserSignUp";
import './AdminNavigator.css';
import { Routes, Route, Link } from 'react-router-dom';

class AdminNavigator extends Component {

    render() {

        return (
            <div className="AdminNavigator">
                
                <nav className="navstyle">
                    <button className="Navbtn"><Link to="/" style={{ textDecoration: 'none', color: 'white'}}>Home</Link></button>
                    <button className="Navbtn"><Link to="/NewDeedForm" style={{ textDecoration: 'none', color: 'white'}}>New Land Deed</Link></button>
                    <button className="Navbtn"><Link to="/SearchDeed" style={{ textDecoration: 'none', color: 'white'}}>Search Deeds</Link></button>
                    <button className="Navbtn"><Link to="/SearchDeed2" style={{ textDecoration: 'none', color: 'white'}}>Search Deeds By Address</Link></button>
                    <button className="Navbtn"><Link to="/ChangeLawSel" style={{ textDecoration: 'none', color: 'white'}}>Change Lawyer And Owner</Link></button>
                    <button className="Navbtn"><Link to="/UserSignUp" style={{ textDecoration: 'none', color: 'white'}}>User Sign up</Link></button>
                </nav>

                <Routes>
                    <Route path="/" element={ <AdminHome /> }/>
                    <Route path="/NewDeedForm" element={ <NewDeedForm /> }/>
                    <Route path="/SearchDeed" element={ <SearchDeed /> }/>
                    <Route path="/SearchDeed2" element={ <SearchDeed2 /> }/>
                    <Route path="/ChangeLawSel" element={ <ChangeLawSel /> }/>
                    <Route path="/UserSignUp" element={ <UserSignUp /> }/>
                    <Route path="*" element={ <PageNotFound /> }/>
                </Routes>

            </div>
        );
    }
}

export default AdminNavigator;
