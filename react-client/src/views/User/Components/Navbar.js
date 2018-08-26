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
                <h4>{this.props.username}</h4>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <button className="btn" onClick={() => this.props.toggleNavigation(0)}>Explore <span className="sr-only">(current)</span></button>
                        </li>
                        <li className="nav-item">
                            <button className="btn" onClick={() => this.props.toggleNavigation(1)}>Library</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn" onClick={() => this.props.toggleNavigation(2)}>Reviews</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn" onClick={() => this.props.toggleNavigation(3)}>Reader</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn disabled">Friends (disabled)</button>
                        </li>
                    </ul>
                </div>
                <div className="col-4 d-flex justify-content-end">
                    <button className="btn" onClick={() => this.props.navigationSwitch(1)}> Log Out </button>
                </div>
            </nav>
        )
    }
}

export default Navbar;