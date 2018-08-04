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

// TODOS
// - pass the userid for the login to Discover
// - pass the userid to GoogleSearch
// - will need to pass a function that causes the overall page to refresh
//   to Discover and GoogleSearch. When they add a book, i want that live updated.
// - After adding a book i want it added to the newsfeed

export class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: undefined,
            // userid: this.props.userid,
            explore: true,
            library: false,
            reviews: false,
        }
    }

    // function used by the buttons in the navigation bar
    // to change the page that's being viewed by the user
    toggleNavigation = (data) => {
        if (data === 0) {
            this.setState({
                explore: true,
                library: false,
                reviews: false,
            })
        } else if (data === 1) {
            this.setState({
                explore: false,
                library: true,
                reviews: false,
            })
        } else if (data === 2) {
            this.setState({
                explore: false,
                library: false,
                reviews: true,
            })
        }
    }

    render() {
        // Variables
        let body;

        // Depending on the state, will display different pages
        if (this.state.explore) {
            //MAIN
            body =
                <div className="row p-4">
                    <div className="col-xl-4 col-lg-4 col-m-6 col-sm-12 col-xs-12 mt-3">
                        <div className="mb-3">
                            <Discover
                                userid={this.state.userid}
                            />
                        </div>
                        <div className="mb-3">
                            <GoogleSearch
                                userid={this.state.userid}
                            />
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-m-6 col-sm-12 col-xs-12">
                        <div id="userdashboard-newsfeed-container" className="mt-3">
                            <Newsfeed />
                        </div>
                    </div>
                </div>
        }

        if (this.state.library) {
            //LIBRARY
            body =
                <div>
                    <UserBooks />
                </div>
        }

        if (this.state.reviews) {
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
        }

        return (
            <div>
                <Navbar
                    toggleNavigation={this.toggleNavigation}
                />
                {body}
            </div>// End
        )
    }
}

export default User;