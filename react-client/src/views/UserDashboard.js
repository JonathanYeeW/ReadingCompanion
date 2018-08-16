// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';
// import React, { Component } from 'react';

import { Navbar } from './Components/UserDashboard/Navbar'
import { Discover } from './Components/UserDashboard/Explore/Discover'
import { GoogleSearch } from './Components/UserDashboard/Explore/GoogleSearch'
import { Reviews } from './Components/UserDashboard/Reviews/Reviews'
import { UserBooks } from './Components/UserDashboard/Library/UserBooks'
import { CreateReview } from './Components/UserDashboard/Reviews/CreateReview'
import { Newsfeed } from './Components/UserDashboard/Explore/Newsfeed'
import { Reader } from './Components/UserDashboard/Reader/Reader'

// TODOS
// - After adding a book i want it added to the newsfeed
// <X> Validation at SignUp for if user already exists
// - Add Topshelf to User Library
// - Create a User Friends Profile Page
// - Flagging Posts for Admin to monitor
// - Like posts ability
// - When a user creates a post, it doesn't update the page with the new post.
// <X> On the backend, add required to the Schemas
// - Update the admin dashboard so i can have a button to delete all objects
// - Create CRUD Capabilities for Reviews
// - Add rating Capabilities to Books
// - Incorporate Redux
// <X> Figure out the async/await so that i can properly setup controllers

// Props (from App.js):
// - userid
// - navigationSwitch

var userManager = require('../controllers/userManager')

export class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.userid,
            explore: true,
            library: false,
            reviews: false,
            reader: false,
        }
        this.fetchUserData()
    }

    // function used by the buttons in the navigation bar
    // to change the page that's being viewed by the user
    toggleNavigation = (data) => {
        if (data === 0) {
            this.setState({
                explore: true,
                library: false,
                reviews: false,
                reader: false,
            })
        } else if (data === 1) {
            this.setState({
                explore: false,
                library: true,
                reviews: false,
                reader: false,
            })
        } else if (data === 2) {
            this.setState({
                explore: false,
                library: false,
                reviews: true,
                reader: false,
            })
        } else if (data === 3) {
            this.setState({
                explore: false,
                library: false,
                reviews: false,
                reader: true,
            })
        }
    }

    // After a user logs in, they're directed to the 
    // userdashboard. On construction this function grabs 
    // the userobject based on the prop.userid so i can 
    // customize the dashboard with the user data
    fetchUserData = () => {
        userManager.fetchUserData(this.props.userid)
            .then(res => {
                console.log(res)
                this.setState({
                    firstname: res.firstname,
                    lastname: res.lastname
                })
            })
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
                <div className="p-3">
                    <UserBooks
                        userid={this.props.userid}
                        username={this.state.firstname + " " + this.state.lastname}
                    />
                </div>
        }

        if (this.state.reviews) {
            //REVIEWS
            body =
                <div className="row p-3">
                    <div className="col-5">
                        <CreateReview
                            userid={this.props.userid}
                            username={this.state.firstname + " " + this.state.lastname}
                        />
                    </div>
                    <div className="col-7">
                        <h3>My Book Reviews</h3>
                        <Reviews
                            userid={this.props.userid}
                        />
                    </div>
                </div>
        }

        if (this.state.reader) {
            body =
                <div className="row p-3">
                    <Reader />
                </div>
        }

        return (
            <div>
                <Navbar
                    toggleNavigation={this.toggleNavigation}
                    username={this.state.firstname + " " + this.state.lastname}
                    navigationSwitch={this.props.navigationSwitch}
                />
                {body}
            </div>// End
        )
    }
}

export default User;