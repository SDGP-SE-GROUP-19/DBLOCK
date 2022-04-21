import React, { Component } from "react";
import './SignUpsHome.css';
import { Routes, Route, Link } from 'react-router-dom';

class SignUpsHome extends Component {

    render() {
        return (
            <div className="SignUpsHome">
                    <div className="SignUpsHome-glass">
                        <div className="SignUpsHome-topic">
                            <h2 className="SignUpsHome-heading">Sign Ups Page</h2> 
                            <p className="SignUpsHome-description">Select your sign up option</p> 
                        </div>

                        <div>
                            <div>
                            <button className="SignUpsHomeBtn" ><Link to="/" style={{ textDecoration: 'none', color: 'white'}}>Sign up home</Link></button>
                            </div>
                            <div>
                            <button className="SignUpsHomeBtn" ><Link to="/LawyerSignUp" style={{ textDecoration: 'none', color: 'white'}}>Lawyer SignUp</Link></button>
                            </div>
                            <div>
                            <button className="SignUpsHomeBtn" ><Link to="/UserSignUp" style={{ textDecoration: 'none', color: 'white'}}>User Sign up</Link></button>
                            </div>
                        </div>
                    </div>
            </div>

        );
    }
}

export default SignUpsHome;
