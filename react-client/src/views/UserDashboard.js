// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';
// import React, { Component } from 'react';

import { Navbar } from '../controllers/UserDashboard/Navbar'
import { Discover } from '../controllers/UserDashboard/Explore/Discover'
import { GoogleSearch } from '../controllers/UserDashboard/Explore/GoogleSearch'
import { Newsfeed } from '../controllers/UserDashboard/Explore/Newsfeed'
import { UserBooks } from '../controllers/UserDashboard/Library/UserBooks'
import { CreateReview } from '../controllers/UserDashboard/Reviews/CreateReview'

export class User extends Component {
    render() {
        // Variables
        let body;

        // Setting the body depeneding on the navigation

        // //MAIN
        // body =
        //     <div className="row p-4">
        //         <div className="col-xl-4 col-lg-4 col-m-6 col-sm-12 col-xs-12 mt-3">
        //             <div className="mb-3">
        //                 <Discover />
        //             </div>
        //             <div className="mb-3">
        //                 <GoogleSearch />
        //             </div>
        //         </div>
        //         <div className="col-xl-8 col-lg-8 col-m-6 col-sm-12 col-xs-12">
        //             <div id="userdashboard-newsfeed-container" className="mt-3">
        //                 <Newsfeed />
        //             </div>
        //         </div>
        //     </div>

        // //LIBRARY
        // body = 
        //     <div>
        //         <UserBooks />
        //     </div>

        //REVIEWS
        body =
            <div className="row p-3">
                <div className="col-5">
                    <CreateReview />
                </div>
                <div className="col-7">
                    <Newsfeed />
                </div>
            </div>

        return (
            <div>
                <Navbar />
                {body}
            </div>// End
        )
    }
}

export default User;