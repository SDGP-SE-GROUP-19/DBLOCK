import React, {Component} from "react";
import Key from "./Images/Key.png";
import './MainHomePage.css';
import { Link } from 'react-router-dom';

class MainHomePage extends Component {
    
    render() {

        return (
            <>
            <div className="topicback">
            <h1 className="mainhead">
                WELCOME TO DBLOCK !
            </h1>
            </div>
            <div className="MainHomePage">
                    <div className="sub-mainMH">

                        <form onSubmit={this.handleSubmit}>

                            <div className="imgMH">
                                <div className="container-imageMH">
                                    <img src={Key} alt="Key" className="Key" />
                                </div>
                            </div>

                            <div>
                                <p><b>SELECT ACCOUNT</b></p>
                            </div>

                            <div>
                                <div className="button-holderMH">
                                    <button className="buttonMH"><Link to="/AdminNavigator" style={{ textDecoration: 'none', color: 'white' }}>Administrator</Link></button>
                                </div>
                                <div className="button-holderMH">
                                    <button className="buttonMH"><Link to="/AdminNavigator" style={{ textDecoration: 'none', color: 'white' }}>User</Link></button>
                                </div>
                                <div className="button-holderMH">
                                    <button className="buttonMH"><Link to="/AdminNavigator" style={{ textDecoration: 'none', color: 'white' }}>Lawyer</Link></button>
                                </div>
                            </div>


                        </form>

                    </div>

                </div></>
            
        );
    }
}

export default MainHomePage;