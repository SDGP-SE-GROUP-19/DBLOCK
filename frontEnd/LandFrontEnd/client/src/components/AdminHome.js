import React, { Component } from "react";
import './AdminHome.css';
import profile from "./Images/admin.png";
import { Link } from 'react-router-dom';

class AdminHome extends Component {

    render() {

        return (
            <>
            
                <div className="Row">
                    <div className="Column">
                        <h3 className="heading">Welcome Admin !</h3>
                    </div>

                    <div className="Column">
                        <div className="AdminImage">
                            <img src={profile} alt="profile" className="profile"/>
                        </div>
                    </div>

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
            </>
        );
    }
}

export default AdminHome;
