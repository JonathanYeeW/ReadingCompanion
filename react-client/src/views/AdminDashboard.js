// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';

let bookManager = require('../controllers/bookManager')
let userManager = require('../controllers/userManager')
let reviewManager = require('../controllers/reviewManager')
let dummyData = require('../dummyData')

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
        this.loadData()
    }

    loadData = () => {
        console.log("## AdminDashboard ## loadData()")
        bookManager.bookCounter()
            .then(res => {
                this.setState({
                    bookcounter: res.count
                })
            })
        userManager.userCounter()
            .then(res => {
                this.setState({
                    usercounter: res.count
                })
            })
        reviewManager.reviewCounter()
            .then(res => {
                console.log(res.count)
                this.setState({
                    reviewcounter: res.count
                })
            })
    }

    // Manage Database
    deleteAllBooks = () => {
        console.log("## AdminDashboard ## deleteAllBooks()")
        bookManager.deleteAllBooks()
            .then(res => {
                console.log(res)
                this.loadData()
            })
    }

    deleteAllUsers = () => {
        console.log("## AdminDashboard ## deleteAllUsers()")
        userManager.deleteAllUsers()
            .then(res => {
                console.log(res)
                this.loadData()
            })
    }

    deleteAllReviews = () => {
        console.log("## AdminDashboard ## deleteAllReviews()")
        reviewManager.deleteAllReviews()
            .then(res => {
                console.log(res)
                this.loadData()
            })
    }

    // Create Dummy Products
    dummyBooks = () => {
        console.log("## AdminDashboard ## dummyBooks()")
        for (let i = 0; i < dummyData.Books.length; i++) {
            let data =
            {
                title: dummyData.Books[i].title,
                author: dummyData.Books[i].title,
            }
            bookManager.createBook(data)
        }
        this.loadData()
    }

    dummyUsers = () => {
        console.log("## AdminDashboard ## dummyUsers()")
        for (let i = 0; i < dummyData.Users.length; i++) {
            let body = {
                email: dummyData.Users[i].email,
                firstname: dummyData.Users[i].firstname,
                lastname: dummyData.Users[i].lastname,
                password: dummyData.Users[i].password
            }
            if (i != dummyData.Users.length - 1) {
                // not the last
                userManager.createNewUser(body)
            } else {
                // the last and fetch all users to populate views
                userManager.createNewUser(body)
                    .then(this.loadData())
            }
        }
    }

    dummyReviews = () => {
        console.log("## AdminDashboard ## dummyReviews()")
        for (let i = 0; i < dummyData.Reviews.length; i++) {
            const data = {
                title: dummyData.Reviews[i].title,
                userid: dummyData.Reviews[i].userid,
                username: dummyData.Reviews[i].username,
                review: dummyData.Reviews[i].review,
            }
            if (i != dummyData.Reviews.length - 1) {
                reviewManager.createReview(data)
            } else {
                reviewManager.createReview(data)
                    .then(this.loadData())
            }
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
                    <div className="col-6 d-flex justify-content-start">
                        <a className="navbar-brand" href="#">Admin Dashboard</a>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
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
                                                <div className="btn-toolbar" role="toolbar">
                                                    <div className="btn-group mr-2" role="group" aria-label="First group">
                                                        <button className="btn btn-danger" onClick={() => this.deleteAllBooks()}>Delete Books</button>
                                                    </div>
                                                    <div className="btn-group mr-2" role="group" aria-label="Second group">
                                                        <button className="btn btn-danger" onClick={() => this.deleteAllUsers()}>Delete Users</button>
                                                    </div>
                                                    <div className="btn-group" role="group" aria-label="Third group">
                                                        <button className="btn btn-danger" onClick={() => this.deleteAllReviews()}>Delete Reviews</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="btn-toolbar" role="toolbar">
                                                    <div className="btn-group mr-2" role="group" aria-label="First group">
                                                        <button className="btn btn-warning" onClick={() => this.dummyBooks()}>Dummy Books</button>
                                                    </div>
                                                    <div className="btn-group mr-2" role="group" aria-label="Second group">
                                                        <button className="btn btn-warning" onClick={() => this.dummyUsers()}>Dummy Users</button>
                                                    </div>
                                                    <div className="btn-group" role="group" aria-label="Third group">
                                                        <button className="btn btn-warning" onClick={() => this.dummyReviews()}>Dummy Reviews</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <UserList />
                    <BookList />
                    <ReviewList />

                </div>


                <nav className="navbar bg-dark">
                    <h1></h1>
                </nav>
            </div>
        )
    }
}//End AdminDashboard

export default AdminDashboard;

export class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false
        }
    }

    render() {
        let body;
        if (this.state.expand === false) {
            body = undefined
        } else {
            body =
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
        }

        return (
            <div className="row mb-3">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-4">
                                    <h3>Users</h3>
                                </div>
                                <div className="col-8 justify-content-end d-flex">
                                    <button className="btn btn-secondary" onClick={() => this.setState({ expand: !this.state.expand })}>Expand</button>
                                </div>
                            </div>
                        </div>
                        {body}
                    </div>
                </div>
            </div>
        )
    }
}//End Login

export class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false
        }
    }
    render() {
        let body;
        if (this.state.expand === false) {
            body = undefined
        } else {
            body =
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
        }

        return (
            <div className="row mb-3">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-4">
                                    <h3>Books</h3>
                                </div>
                                <div className="col-8 justify-content-end d-flex">
                                    <button className="btn btn-secondary" onClick={() => this.setState({ expand: !this.state.expand })}>Expand</button>
                                </div>
                            </div>
                        </div>
                        {body}
                    </div>
                </div>
            </div>
        )
    }
}

export class ReviewList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expand: false
        }
    }
    render() {
        let body;
        if (this.state.expand === false) {
            body = undefined
        } else {
            body =
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
        }

        return (
            <div className="row mb-3">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-4">
                                    <h3>Reviews</h3>
                                </div>
                                <div className="col-8 justify-content-end d-flex">
                                    <button className="btn btn-secondary" onClick={() => this.setState({ expand: !this.state.expand })}>Expand</button>
                                </div>
                            </div>
                        </div>
                        {body}
                    </div>
                </div>
            </div>
        )
    }
}
