//PORT=3001 nodemon bin/www

import React, { Component } from 'react';
import { User } from './views/User/UserLanding';
import { Login } from './views/Public/PublicLanding';
import { AdminDashboard } from './views/Admin/AdminLanding';
import Bookform from './Admin/view/Bookform';

class App extends Component {
  state = {
    admin: false,
    login: true,
    dashboard: false,
    userid: undefined,
  }

  navigationSwitch = (value) => {
    console.log("## App.js ## navigationSwitch")
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
    console.log("## App.js ## login")
    this.setState({
      userid: userid,
    })
    this.navigationSwitch(2)
  }

  render() {
    let body;

    if (this.state.admin) {
      body =
        <AdminDashboard
          navigationSwitch={this.navigationSwitch}
        />
    }

    if (this.state.login) {
      body =
        <Login
          login={this.login}
          navigationSwitch={this.navigationSwitch}
        />
    }

    if (this.state.dashboard) {
      body =
        <User
          userid={this.state.userid}
          navigationSwitch={this.navigationSwitch}
        />
    }


    return (
      <div id="app-wrapper">
        {/* {body} */}
        <div className="container">
          <Bookform />
        </div>
        
      </div>
    )
  }
}

export default App;
