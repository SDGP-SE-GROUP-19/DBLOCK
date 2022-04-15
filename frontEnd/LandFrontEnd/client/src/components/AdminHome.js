import React, { Component } from "react";
import './AdminHome.css';
import profile from "./Images/admin.png";
import { Link } from 'react-router-dom';

class AdminHome extends Component {

    render() {

        return (
            <>
            {/* column which holds the description of what this page is about */}
                <div className="Row">
                <div className="adminHome-glass">
                    <div className="Column">
                        <h2 className="adminHome-heading">Welcome Admin !</h2>
                    </div>

                    <div className="Column">
                        <div className="AdminImage">
                            <img src={profile} alt="profile" className="profile"/>
                        </div>
                    </div>

                    {/* Container which holds a set of buttons that relate to the functionalities of the administrator */}
                    <div className="containerH">
                        <form className="formH">
                        <div>
                        <button className="AdminHomebtn"><Link to="/NewDeedForm" style={{ textDecoration: 'none', color: 'white'}}>New Land Deed</Link></button>
                        </div>
                        <div>
                        <button className="AdminHomebtn"><Link to="/SearchDeed" style={{ textDecoration: 'none', color: 'white'}}>Search Deeds</Link></button>
                        </div>
                        <div>
                        <button className="AdminHomebtn"><Link to="/SearchDeed2" style={{ textDecoration: 'none', color: 'white'}}>Search Deeds By Address</Link></button>
                        </div>
                        <div>
                        <button className="AdminHomebtn"><Link to="/ChangeLawSel" style={{ textDecoration: 'none', color: 'white'}}>Change Lawyer And Owner</Link></button>
                        </div>
                        </form>

                    </div>
                    </div>
                    
                    
                </div>
            </>
        );
    }
}

export default AdminHome;
