//PORT=3001 nodemon bin/www

import React, { Component } from 'react';
import './App.css';
import { Navbar } from './Pages/Navbar';
import { Admin } from './Pages/AdminDashboard/Admin';
import { Dashboard } from './Pages/UserDashboard/Dashboard';
import { Login } from './Pages/Login';

class App extends Component {
  state = {
    admin: false,
    login: true,
    dashboard: false,
    userid: undefined,
  }

  navigationSwitch = (value) => {
    if (value === 0) {
      this.setState({
        admin: true,
        login: false,
        dashboard: false,
      })
    } else if (value === 1) {
      this.setState({
        admin: false,
        login: true,
        dashboard: false,
      })
    } else if (value === 2) {
      this.setState({
        admin: false,
        login: false,
        dashboard: true,
      })
    }
  }

  login = (userid) => {
    this.setState({
      userid: userid,
    })
    this.navigationSwitch(2)
  }

  render() {
    return (
      <div id="app-wrapper">
        {/* <Dashboard /> */}
        <Navbar
          navigationSwitch={this.navigationSwitch}
        />
        {this.state.admin && <Admin />}
        {this.state.login && <Login
          login={this.login}
        />}
        {this.state.dashboard && <Dashboard
          userid={this.state.userid}
        />}
      </div>
    )
  }
}

export default App;
