import React, { Component } from "react";
import './LawyerHome.css';

class LawyerHome extends Component {

    render() {
        return (

            <div className="LawyerHome">
                <div className="LawyerHome-glass">
                    <div className="LawyerHome-topic">
                            <h2 className="LawyerHome-heading">Lawyer Home Page</h2> 
                            <p className="LawyerHome-lawyer-p"> "Hello, this message is sent you to notify that your land is in transfering process..."</p>
                    </div>
                    

                    <div>
                        <div>
                        <button className="LawyerHome-btn">ACCEPT</button>
                        </div>
                        <div>
                        <button className="LawyerHome-btn">DECLINE</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default LawyerHome;
