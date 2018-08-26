// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';
// import React, { Component } from 'react';

import { Navbar } from './Components/Navbar'
import { Discover } from './Components/Explore/Discover'
import { GoogleSearch } from './Components/Explore/GoogleSearch'
import { Reviews } from './Components/Reviews/Reviews'
import { UserBooks } from './Components/Library/UserBooks'
import { CreateReview } from './Components/Reviews/CreateReview'
import { Newsfeed } from './Components/Explore/Newsfeed'
import { Reader } from './Components/Reader/Reader'

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

var userManager = require('../../controllers/userManager')

export class User extends Component {
    constructor(props) {
        super(props);
        console.log("## UserDashboard ## props:", this.props)
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
        console.log("## UserDashboard ## toggleNavigation()")
        switch (data) {
            case 0:
                this.setState({
                    explore: true,
                    library: false,
                    reviews: false,
                    reader: false,
                })
                break
            case 1:
                this.setState({
                    explore: false,
                    library: true,
                    reviews: false,
                    reader: false,
                })
                break
            case 2:
                this.setState({
                    explore: false,
                    library: false,
                    reviews: true,
                    reader: false,
                })
                break
            case 3:
                this.setState({
                    explore: false,
                    library: false,
                    reviews: false,
                    reader: true,
                })
                break
            default:
                console.log("Error")

        }
    }

    // After a user logs in, they're directed to the 
    // userdashboard. On construction this function grabs 
    // the userobject based on the prop.userid so i can 
    // customize the dashboard with the user data
    fetchUserData = () => {
        console.log("## UserDashboard ## fetchUserData()")
        userManager.fetchUserData(this.props.userid)
            .then(res => {
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
                        {/* <div className="mb-3">
                            <GoogleSearch
                                userid={this.state.userid}
                            />
                        </div> */}
                    </div>
                    <div className="col-xl-8 col-lg-8 col-m-6 col-sm-12 col-xs-12">
                        <div id="userdashboard-newsfeed-container" className="mt-3">
                            <h4>Newsfeed here</h4>
                            {/* <Newsfeed /> */}
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