import React, { Component } from 'react';

// Props:
// - navigationSwitch()
// - toggleView()

class AdminNavbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
                    <h4>Admin Dashboard</h4>
                    <div className="btn-toolbar ml-5">
                        <div className="btn-group mr-2">
                            <button className="btn btn-outline-secondary" onClick={() => this.props.toggleView(0)}>Home</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-outline-secondary" onClick={() => this.props.toggleView(1)}>User Workbench</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-outline-secondary" onClick={() => this.props.toggleView(2)}>Book Workbench</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-outline-secondary" onClick={() => this.props.toggleView(3)}>Database</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn" onClick={() => this.props.navigationSwitch(1)}>Log Out</button>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default AdminNavbar;
