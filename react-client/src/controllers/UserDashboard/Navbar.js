// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';

// Props (from UserDashboard.js):
// - toggleNavigation()
// - username
// - navigationSwitch

export class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="row dashboard-width-fill">
                    <div className="col-4 d-flex justify-content-start">
                        <a className="navbar-brand" href="#">{this.props.username}</a>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <button className="btn btn-outline-secondary" onClick={() => this.props.toggleNavigation(0)}>Explore</button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-secondary" onClick={() => this.props.toggleNavigation(1)}>Library</button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-secondary" onClick={() => this.props.toggleNavigation(2)}>Reviews</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <button className="btn" onClick={() => this.props.navigationSwitch(1)}> Log Out </button>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;