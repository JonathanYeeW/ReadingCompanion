// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';

export class Navbar extends Component {
    render() {
        return (
            <div id="navbar-wrapper">
                <nav className="navbar navbar-dark bg-dark">
                    <div className="row mx-auto">
                        <div className="btn-toolbar" role="toolbar">
                            <div className="btn-group mr-2" role="group">
                                <button className="btn btn-outline-secondary" onClick={() => this.props.navigationSwitch(0)}>Admin Dashboard</button>
                            </div>
                            <div className="btn-group mr-2" role="group">
                                <button className="btn btn-outline-secondary" onClick={() => this.props.navigationSwitch(1)}>User Login/Registration</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;