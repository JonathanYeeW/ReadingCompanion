// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';

let bookManager = require('../controllers/bookManager')
let userManager = require('../controllers/userManager')
let reviewManager = require('../controllers/reviewManager')

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
        for (let i = 0; i < superBooks.length; i++) {
            let data =
            {
                title: superBooks[i].title,
                author: superBooks[i].title,
            }
            bookManager.createBook(data)
        }
        this.loadData()
    }

    dummyUsers = () => {
        console.log("## AdminDashboard ## dummyUsers()")
        for (let i = 0; i < superUsers.length; i++) {
            let body = {
                email: superUsers[i].email,
                firstname: superUsers[i].firstname,
                lastname: superUsers[i].lastname,
                password: superUsers[i].password
            }
            if (i != superUsers.length - 1) {
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
        for (let i = 0; i < superReviews.length; i++) {
            const data = {
                title: superReviews[i].title,
                userid: superReviews[i].userid,
                username: superReviews[i].username,
                review: superReviews[i].review,
            }
            if (i != superReviews.length - 1) {
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

const superReviews = [
    {
        title: "title 1",
        userid: "userid 1",
        username: "username 1",
        review: "review 1",
    },
    {
        title: "title 2",
        userid: "userid 2",
        username: "username 2",
        review: "review 2",
    },
    {
        title: "title 3",
        userid: "userid 3",
        username: "username 3",
        review: "review 3",
    },
    {
        title: "title 4",
        userid: "userid 4",
        username: "username 4",
        review: "review 4",
    },
    {
        title: "title 5",
        userid: "userid 5",
        username: "username 5",
        review: "review 5",
    },
    {
        title: "title 6",
        userid: "userid 6",
        username: "username 6",
        review: "review 6",
    },
    {
        title: "title 7",
        userid: "userid 7",
        username: "username 7",
        review: "review 7",
    },
    {
        title: "title 8",
        userid: "userid 8",
        username: "username 8",
        review: "review 8",
    },
    {
        title: "title 9",
        userid: "userid 9",
        username: "username 9",
        review: "review 9",
    },
    {
        title: "title 10",
        userid: "userid 10",
        username: "username 10",
        review: "review 10",
    },
]