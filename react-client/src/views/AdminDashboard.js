// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';

export class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        console.log("## AdminDashboard ## props:", this.props)
        this.state = {
            bookcounter: 0,
            usercounter: 0,
            reviewcounter: 0,
            newsfeedcounter: 0,
            sitevisitcounter: 0,
        }
    }

    // Manage Database
    deleteAllBooks = () => {
        console.log("## AdminDashboard ## deleteAllBooks()")
    }

    deleteAllUsers = () => {
        console.log("## AdminDashboard ## deleteAllUsers()")
    }

    deleteAllReviews = () => {
        console.log("## AdminDashboard ## deleteAllReviews()")
    }

    // Create Dummy Products
    dummyBooks = () => {
        console.log("## AdminDashboard ## dummyBooks()")
    }

    dummyUsers = () => {
        console.log("## AdminDashboard ## dummyUsers()")
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
                    <div className="col-6 d-flex justify-content-start">
                        <a className="navbar-brand" href="#">Admin Dashboard</a>
                        <button className="btn" onClick={() => this.props.navigationSwitch(1)}>Login</button>
                    </div>
                </nav>
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-4">
                            <div className="card-body bg-dark">
                                <div className="card-body bg-white">
                                    <p>Books: {this.state.bookcounter}</p>
                                    <p>Users: {this.state.usercounter}</p>
                                    <p>Reviews: {this.state.reviewcounter}</p>
                                    <p>Newsfeed: {this.state.newsfeedcounter}</p>
                                    <p>Site Visits: {this.state.sitevisitcounter}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="row">
                                <div className="card-body bg-dark">
                                    <div className="card-body bg-white">
                                        <div className="row mb-3">
                                            <div className="col-12">
                                                <div class="btn-toolbar" role="toolbar">
                                                    <div class="btn-group mr-2" role="group" aria-label="First group">
                                                        <button className="btn btn-danger" onClick={() => this.deleteAllBooks()}>Delete Books</button>
                                                    </div>
                                                    <div class="btn-group mr-2" role="group" aria-label="Second group">
                                                        <button className="btn btn-danger" onClick={() => this.deleteAllUsers()}>Delete Users</button>
                                                    </div>
                                                    <div class="btn-group" role="group" aria-label="Third group">
                                                        <button className="btn btn-danger" onClick={() => this.deleteAllReviews()}>Delete Reviews</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div class="btn-toolbar" role="toolbar">
                                                    <div class="btn-group mr-2" role="group" aria-label="First group">
                                                        <button className="btn btn-warning" onClick={() => this.dummyBooks()}>Dummy Books</button>
                                                    </div>
                                                    <div class="btn-group mr-2" role="group" aria-label="Second group">
                                                        <button className="btn btn-warning" onClick={() => this.dummyUsers()}>Dummy Users</button>
                                                    </div>
                                                    <div class="btn-group" role="group" aria-label="Third group">
                                                        <button className="btn btn-warning disabled">Dummy Reviews</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="row mb-3">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-4">
                                            <h3>Users</h3>
                                        </div>
                                        <div className="col-8 justify-content-end d-flex">
                                            <button className="btn btn-secondary">Expand</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Username</th>
                                                <th scope="col">Fullname</th>
                                                <th scope="col">Last Signin</th>
                                                <th scope="col">Library Size</th>
                                                <th scope="col">Reviews</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Admin</td>
                                                <td>Jonathan Yee</td>
                                                <td>Today</td>
                                                <td>100</td>
                                                <td>3</td>
                                                <td><button className="btn btn-outline-danger">Delete</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="row mb-3">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-4">
                                            <h3>Books</h3>
                                        </div>
                                        <div className="col-8 justify-content-end d-flex">
                                            <button className="btn btn-secondary">Expand</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Author</th>
                                                <th scope="col">ISBN</th>
                                                <th scope="col">Likes</th>
                                                <th scope="col">Reviews</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Harry Potter 1</td>
                                                <td>JK Rowling</td>
                                                <td>1234567890</td>
                                                <td>100</td>
                                                <td>3</td>
                                                <td><button className="btn btn-outline-danger">Delete</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="row mb-3">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-4">
                                            <h3>Reviews</h3>
                                        </div>
                                        <div className="col-8 justify-content-end d-flex">
                                            <button className="btn btn-secondary">Expand</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Username</th>
                                                <th scope="col">Book Title</th>
                                                <th scope="col">Pub Date</th>
                                                <th scope="col">Likes</th>
                                                <th scope="col">Flags</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Admin</td>
                                                <td>Harry Potter</td>
                                                <td>Today</td>
                                                <td>100</td>
                                                <td>3</td>
                                                <td><button className="btn btn-outline-danger">Delete</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                </div> */}
                </div>
            </div>
        )
    }
}//End AdminDashboard

export default AdminDashboard;

const superUsers = [
    {
        email: "Andrew@email.com",
        firstname: "Andrew",
        lastname: "Edstrom",
        password: "password"
    },
    {
        email: "Jessica@email.com",
        firstname: "Jessica",
        lastname: "Mandele",
        password: "password"
    },
    {
        email: "Rachel@email.com",
        firstname: "Rachel",
        lastname: "Schmidt",
        password: "password"
    },
    {
        email: "Jonathan@email.com",
        firstname: "Jonathan",
        lastname: "Yee",
        password: "password"
    },
    {
        email: "Michael@email.com",
        firstname: "Michael",
        lastname: "O'dell",
        password: "password"
    },
    {
        email: "Max@email.com",
        firstname: "Max",
        lastname: "deGruy",
        password: "password"
    },
    {
        email: "Mariel@email.com",
        firstname: "Mariel",
        lastname: "Little",
        password: "password"
    },
    {
        email: "Sterling@email.com",
        firstname: "Sterling",
        lastname: "Schyler",
        password: "password"
    },
    {
        email: "Alex@email.com",
        firstname: "Alex",
        lastname: "Edstrom",
        password: "password"
    },
    {
        email: "Jocko@email.com",
        firstname: "Jocko",
        lastname: "Willink",
        password: "password"
    },
    {
        email: "admin",
        firstname: "Jonathan",
        lastname: "Yee (admin)",
        password: "password"
    }
]

const superBooks = [
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "JK Rowling"
    },
    {
        title: "Harry Potter and the Chamber of Secrets",
        author: "JK Rowling"
    },
    {
        title: "Harry Potter and the Prisoner of Azkaban",
        author: "JK Rowling"
    },
    {
        title: "Harry Potter and the Goblet of Fire",
        author: "JK Rowling"
    },
    {
        title: "Harry Potter and the Order of the Phoenix",
        author: "JK Rowling"
    },
    {
        title: "Harry Potter and the Halfblood Prince",
        author: "JK Rowling"
    },
    {
        title: "Harry Potter and the Deathly Hallows",
        author: "JK Rowling"
    },
    {
        title: "Ender's Game",
        author: "Orson Scott Card"
    },
    {
        title: "Ready Player One",
        author: "Ernest Cline"
    },
    {
        title: "The Shallows",
        author: "Nicholas Carr"
    },
    {
        title: "Extreme Ownership",
        author: "Jocko Willink and Leif Babin"
    },
    {
        title: "So Good They Can't Ignore You",
        author: "Cal Newport"
    },
    {
        title: "The Name of the Wind",
        author: "Patrick Rothfuss"
    },
]