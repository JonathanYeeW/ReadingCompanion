// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';
// import { Navbar } from './components/Navbar'
// import { CreateBook } from './components/CreateBook'
// import { Discover } from './components/Discover'
// import { GoogleSearch } from './components/GoogleSearch'
// import { Newsfeed } from '../Pages/newUserDashboard/components/Newsfeed'

export class User extends Component {
    render() {
        return (
            <div>
                <h1>User Dashboard</h1>
                
                {/* <Navbar />

                <div className="row p-4">
                    <div className="col-xl-4 col-lg-4 col-m-6 col-sm-12 col-xs-12 mt-3">
                        <div className="mb-3">
                            <Discover />
                        </div>
                        <div className="mb-3">
                            <GoogleSearch />
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-m-6 col-sm-12 col-xs-12">
                        <div id="userdashboard-newsfeed-container" className="mt-3">
                            <Newsfeed />
                        </div>
                    </div>
                </div> */}
            </div>// End
        )
    }
}

export default User;