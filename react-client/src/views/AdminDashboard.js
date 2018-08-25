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
            users: [],
            books: [],
            reviews: [],
        }
        this.loadData()
    }

    loadData = () => {
        console.log("## AdminDashboard ## loadData()")
        bookManager.getAllBooks()
            .then(res => {
                this.setState({
                    bookcounter: res.books.length,
                    books: res.books
                })
            })

        userManager.getAllUsers()
            .then(res => {
                this.setState({
                    usercounter: res.users.length,
                    users: res.users
                })
            })

        reviewManager.getAllReviews()
            .then(res => {
                this.setState({
                    reviewcounter: res.reviews.length,
                    reviews: res.reviews,
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
                author: dummyData.Books[i].author,
                isbn10: dummyData.Books[i].isbn10,
                isbn13: dummyData.Books[i].isbn13,
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
            if (i !== dummyData.Users.length - 1) {
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
            if (i !== dummyData.Reviews.length - 1) {
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
                        {/* <a className="navbar-brand" href="#">Admin Dashboard</a> */}
                        <h4>Admin Dashboard</h4>
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

                    <UserList
                        users={this.state.users}
                        loadData={this.loadData}
                    />
                    <BookList
                        books={this.state.books}
                        loadData={this.loadData}
                    />
                    <ReviewList
                        reviews={this.state.reviews}
                        loadData={this.loadData}
                    />

                </div>


                <nav className="navbar bg-dark">
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

    deleteUser = (userid) => {
        userManager.deleteUser({ userid: userid })
            .then(res => {
                console.log(res)
                this.props.loadData()
            })
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
                                <th scope="col">Username/Email</th>
                                <th scope="col">Fullname</th>
                                <th scope="col">Last Signin</th>
                                <th scope="col">Library Size</th>
                                <th scope="col">Reviews</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.users.map(user => {
                                    return (
                                        <tr>
                                            <td>{user.email}</td>
                                            <td>{user.firstname + " " + user.lastname}</td>
                                            <td>{user.lastSignIn}</td>
                                            <td>#</td>
                                            <td>#</td>
                                            <td><button className="btn btn-outline-danger" onClick={() => this.deleteUser(user._id)}>Delete</button></td>
                                        </tr>
                                    )
                                })
                            }
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
}//End

export class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false
        }
    }

    deleteBook = (data) => {
        console.log("## AdminDashboard ## deleteBook()")
        bookManager.deleteBook({ bookid: data })
        .then(res => {
            console.log(res)
            this.props.loadData()
        })
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
                                <th scope="col">ISBN10</th>
                                <th scope="col">ISBN13</th>
                                <th scope="col">Likes</th>
                                <th scope="col">Reviews</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.books.map(book => {
                                    return (
                                        <tr>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.isbn10}</td>
                                            <td>{book.isbn13}</td>
                                            <td>{book.likes}</td>
                                            <td>{book.reviews.length}</td>
                                            <td><button className="btn btn-outline-danger" onClick={() => this.deleteBook(book._id)}>Delete</button></td>
                                        </tr>
                                    )
                                })
                            }
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

    deleteReview = (reviewid) => {
        console.log("## AdminDashboard ## deleteReview()")
        console.log(reviewid)
        reviewManager.deleteReview({ reviewid: reviewid })
            .then(res => {
                console.log(res)
                this.props.loadData()
            })
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
                            {
                                this.props.reviews.map(review => {
                                    return (
                                        <tr>
                                            <td>{review.username}</td>
                                            <td>{review.title}</td>
                                            <td>{review.created_at}</td>
                                            <td>{review.likes}</td>
                                            <td>{review.flags}</td>
                                            <td><button className="btn btn-outline-danger" onClick={() => this.deleteReview(review._id)}>Delete</button></td>
                                        </tr>
                                    )
                                })
                            }
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
