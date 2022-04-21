import React, { Component } from "react";
import './LawyerHome.css';

class LawyerHome extends Component {

    render() {
        return (

            <div className="LawyerHome-body">
                <div className="LawyerHome-content">
                    <h2><span className="LawyerHome-lawyer">Lawyer</span>  <span className="LawyerHome-Notification">Notification</span> Center</h2>
                    <p className="LawyerHome-lawyer-p"> "Hello, this message is sent you to notify that your land is in transfering process..."</p>

                    <span className="LawyerHome-buttons">
                        <button className="LawyerHome-btn">ACCEPT</button>
                        <button className="LawyerHome-btn">DECLINE</button>
                    </span>
                </div>

            </div>
        );
    }
}

export default LawyerHome;
