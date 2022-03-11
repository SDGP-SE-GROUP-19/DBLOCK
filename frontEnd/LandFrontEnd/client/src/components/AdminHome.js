import React, { Component } from "react";
import './AdminHome.css';
import profile from "./Images/admin.png";

class AdminHome extends Component {

    render() {

        return (
            <><div className="Row">
                <div className="Column">
                    <h3 className="heading">Welcome Admin !</h3>
                </div>

                <div className="Column">
                    <div className="AdminImage">
                        <img src={profile} alt="profile" className="profile"/>
                    </div>
                </div>
                
            </div>
            </>
        );
    }
}

export default AdminHome;
