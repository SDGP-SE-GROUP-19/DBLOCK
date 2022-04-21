import React, { Component } from "react";
import './Lawyer.css';

class LawyerHome extends Component {

    render() {
        return (

            <div class="body">
                <div class="content">
                    <h2><span class="lawyer">Lawyer</span>  <span class="Notification">Notification</span> Center</h2>
                    <p> "Hello, this message is sent you to notify that your land is in transfering process..."</p>

                    <span class="buttons">
                        <button>ACCEPT</button>
                        <button>DECLINE</button>
                    </span>
                </div>

            </div>
        );
    }
}

export default LawyerHome;
