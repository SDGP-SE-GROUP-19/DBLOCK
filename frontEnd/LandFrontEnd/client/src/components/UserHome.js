import React, { Component } from "react";
import './AdminHome.css';
import profile from "./Images/admin.png";
import { Link } from 'react-router-dom';


class UserHome extends Component {

    render() {

        return (
            <>
            {/* column which holds the description of what this page is about */}
                <div className="Row">
                    <div className="Column">
                        <h3 className="heading">Welcome User!</h3>
                    </div>

                    <div className="Column">
                        <div className="AdminImage">
                            <img src={profile} alt="profile" className="profile"/>
                        </div>
                    </div>

                    {/* Container which holds a set of buttons that relate to the functionalities of the user */}
                    <div className="containerH">
                        <form className="formH">
                        <div>
                        <button className="AdminHomebtn"><Link to="/DeedsOfUser" style={{ textDecoration: 'none', color: 'white'}}>Deeds Assigned to User</Link></button>
                        </div>
                        <div>
                        <button className="AdminHomebtn"><Link to="/DeedHistory" style={{ textDecoration: 'none', color: 'white'}}>Deed History</Link></button>
                        </div>
                        </form>

                    </div>
                    
                    
                </div>
            </>
        );
    }
}

export default UserHome;
