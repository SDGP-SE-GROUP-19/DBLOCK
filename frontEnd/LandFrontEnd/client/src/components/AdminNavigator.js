import React, { Component } from "react";
import AdminHome from "./AdminHome";
import NewDeedForm from "./NewDeedForm";
import SearchDeed from "./SearchDeed";
import PageNotFound from "./PageNotFound";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

class AdminNavigator extends Component {

    render() {

        return (
            <div className="AdminNavigator">
                <Router>

                    <nav>
                        <Link to="/">[Home]</Link>
                        <Link to="/NewDeedForm">[New Land Deed]</Link>
                        <Link to="/SearchDeed">[Search Deeds]</Link>
                    </nav>

                    <Routes>
                        <Route path="/" element={ <AdminHome /> }/>
                        <Route path="/NewDeedForm" element={ <NewDeedForm /> }/>
                        <Route path="/SearchDeed" element={ <SearchDeed /> }/>
                        <Route path="*" element={ <PageNotFound /> }/>
                    </Routes>

                </Router>
            </div>
        );
    }
}

export default AdminNavigator;
