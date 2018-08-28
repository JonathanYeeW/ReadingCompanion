// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';
import Home from './Components/Home'
import AdminNavbar from './Components/AdminNavbar';
import BookWorkbench from './Components/BookWorkbench';
import UserWorkbench from './Components/UserWorkbench';
import Database from './Components/Database';

export class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        console.log("## AdminDashboard ## props:", this.props)
        this.state = {
            view: "Home"
        }
    }

    toggleView = (data) => {
        console.log("## AdminDashboard ## toggleView()", data)
        switch (data) {
            case (0):
                // Home
                this.setState({
                    view: "Home"
                })
                break;
            case (1):
                // User Workbench
                this.setState({
                    view: "UserWorkbench"
                })
                break;
            case (2):
                // Book Workbench
                this.setState({
                    view: "BookWorkbench"
                })
                break;
            case (3):
                // Database
                this.setState({
                    view: "Database"
                })
                break;
            default:
                console.log("Error")
        }
    }

    render() {
        let view;
        switch (this.state.view) {
            case ("Home"):
                view = <Home />
                break;
            case ("UserWorkbench"):
                view = <UserWorkbench />
                break;
            case ("BookWorkbench"):
                view = <BookWorkbench />
                break;
            case ("Database"):
                view = <Database />
                break;
            default:
                view = <h4>There was an error with view in state</h4>
        }

        return (
            <div>
                <AdminNavbar
                    toggleView={this.toggleView}
                    navigationSwitch={this.props.navigationSwitch}
                />
                {view}
            </div>
        )
    }
}//End AdminDashboard

export default AdminDashboard;