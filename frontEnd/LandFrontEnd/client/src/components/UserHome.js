import React, { Component } from "react";
import './UserHome.css';
import profile from "./Images/admin.png";
import { Link } from 'react-router-dom';


class UserHome extends Component {

    render() {

        return (
            <>
            {/* column which holds the description of what this page is about */}
                <div className="UserRow">
                <div className="userhome-glass">
                    <div className="UserColumn">
                        <h2 className="userhome-heading">Welcome User !</h2>
                    </div>

                    <div className="UserColumn">
                        <div className="userImage">
                            <img src={profile} alt="profile" className="profile"/>
                        </div>
                    </div>

                    {/* Container which holds a set of buttons that relate to the functionalities of the user */}
                    <div className="containerUH">
                        <form className="formUH">
                        <div>
                        <button className="userhomebtn"><Link to="/DeedsOfUser" style={{ textDecoration: 'none', color: 'white'}}>Deeds Assigned to User</Link></button>
                        </div>
                        <div>
                        <button className="userhomebtn"><Link to="/DeedHistory" style={{ textDecoration: 'none', color: 'white'}}>Deed History</Link></button>
                        </div>
                        </form>

                    </div>
                    
                    
                </div>
                </div>
            </>
        );
    }
}

export default UserHome;
