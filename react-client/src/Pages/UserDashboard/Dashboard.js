// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';
import { Spotlight } from './Components/Spotlight';
import { UserInfo } from './Components/UserInfo';
import { UserBooks } from './Components/UserBooks';
import { Discover } from './Components/Discover';
import { CreateBook } from './Components/CreateBook';
import { GoogleSearch } from './Components/GoogleSearch';
import { Blog } from './Components/Blog';
import { Newsfeed } from '../Newsfeed';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.userid,
            books: [],
            newBook: undefined,
            firstname: "",
            lastname: "",
            explore: true,
            library: false,
            reviews: false,
            friends: false,
        }
        this.fetchUserData()
        this.fetchUserBooks()
    }

    fetchUserData = () => {
        const temp = { id: this.props.userid }
        fetch('/users/getuserinfo', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(temp)
        })
            .then(res => res.json())
            .then(res => this.setState({
                firstname: res.firstname,
                lastname: res.lastname,
            }))
    }

    fetchUserBooks = () => {
        const temp = { userid: this.props.userid }
        fetch('/books/usercollection', {
            // fetch('/users/getuserbooks', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(temp)
        })
            .then(res => res.json())
            .then(res => this.setState({
                books: res["books"]
            })
            )
    }

    createBook = (data) => {
        data["userid"] = this.state.userid
        fetch('/books/create', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => console.log(res))
        this.fetchUserBooks()
    }

    deleteBook = (data) => {
        fetch('/books/delete', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ id: data, userid: this.state.userid })
        })
            .then(res => res.json())
            .then(res => console.log(res))
        this.fetchUserBooks()
    }

    removeBook = (data) => {
        fetch('/books/remove', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ id: data, userid: this.state.userid })
        })
            .then(res => res.json())
            .then(res => {
                this.fetchUserBooks()
                this.discoverBook()
            })
    }

    discoverBook = () => {
        fetch('/books/discover', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ id: this.state.userid })
        })
            .then(res => res.json())
            // .then(res => console.log(res.newBook))
            .then(res => this.setState({
                newBook: res.newBook
            }))
    }

    addBookFromDiscover = () => {
        fetch('/books/add', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ id: this.state.newBook._id, userid: this.state.userid })
        })
            .then(res => res.json())
            .then(res => {
                this.fetchUserBooks()
                this.discoverBook()
            })
    }

    mainNavigation = (pass) => {
        console.log(pass)
        if (pass === 0) {
            // 0: Discover
            this.setState({
                explore: true,
                library: false,
                reviews: false,
                friends: false,
            })
        } else if (pass === 1) {
            // 1: Library
            this.setState({
                explore: false,
                library: true,
                reviews: false,
                friends: false,
            })
        } else if (pass === 2) {
            // 2: Reviews
            this.setState({
                explore: false,
                library: false,
                reviews: true,
                friends: false,
            })
        } else if (pass === 3) {
            // 3: Friends
            this.setState({
                explore: false,
                library: false,
                reviews: false,
                friends: true,
            })
        }
    }

    render() {
        let exploreButton;
        let libraryButton;
        let reviewsButton;
        let friendsButton;
        let body;

        if (this.state.explore) {
            exploreButton = <button className="btn btn-light" onClick={() => this.mainNavigation(0)}>Explore</button>
            body =
                <Explore
                    discoverBook={this.discoverBook}
                    addBook={this.addBookFromDiscover}
                    newBook={this.state.newBook}
                    appstate={this.state}
                    createBook={this.createBook}
                    appstate={this.state}
                />
        } else {
            exploreButton = <button className="btn btn-outline-light" onClick={() => this.mainNavigation(0)}>Explore</button>
        }

        if (this.state.library) {
            libraryButton = <button className="btn btn-light" onClick={() => this.mainNavigation(1)}>My Library</button>
            body = 
            <Library 
                books={this.state.books}
                removeBook={this.removeBook}
            />
        } else {
            libraryButton = <button className="btn btn-outline-light" onClick={() => this.mainNavigation(1)}>My Library</button>
        }

        if (this.state.reviews) {
            reviewsButton = <button className="btn btn-light" onClick={() => this.mainNavigation(2)}>My Reviews</button>
            body = <Reviews />
        } else {
            reviewsButton = <button className="btn btn-outline-light" onClick={() => this.mainNavigation(2)}>My Reviews</button>
        }

        if (this.state.friends) {
            friendsButton = <button className="btn btn-light" onClick={() => this.mainNavigation(3)}>Friends</button>
            body = <Friends />
        } else {
            friendsButton = <button className="btn btn-outline-light" onClick={() => this.mainNavigation(3)}>Friends</button>
        }

        return (
            <div id="dashboard-container" className="p-5">
                <div id="dashboard-main" className="dashboard-width-fill row">
                    <div className="card bg-dark dashboard-width-fill">
                        <div className="card-body">
                            <div className="btn-toolbar">
                                <div className="btn-group mr-2">
                                    {exploreButton}
                                </div>
                                <div className="btn-group mr-2">
                                    {libraryButton}
                                </div>
                                <div className="btn-group mr-2">
                                    {reviewsButton}
                                </div>
                                <div className="btn-group mr-2">
                                    {friendsButton}
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {body}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}//End Dashboard

export default Dashboard;

export class Explore extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <div className="mb-4">
                        <Discover
                            discoverBook={this.props.discoverBook}
                            addBook={this.props.addBook}
                            newBook={this.props.appstate.newBook}
                            appstate={this.props.appstate}
                            createBook={this.props.createBook}
                        />
                    </div>
                    <div className="mb-4">
                        <GoogleSearch
                            createBook={this.props.createBook}
                        />
                    </div>
                    <div className="mb-4">
                        <CreateBook
                            appstate={this.props.appstate}
                            createBook={this.props.createBook}
                        />
                    </div>
                </div>
                <div className="col-8">
                    <div className="dashboard-height-fill">
                        <Newsfeed />
                    </div>
                </div>
            </div>
        )
    }
}

export class Library extends Component {
    render() {
        return (
            <div>
                <UserBooks 
                books = {this.props.books}
                removeBook = {this.props.removeBook}
                />
            </div>
        )
    }
}

export class Reviews extends Component {
    render() {
        return (
            <h1>Reviews</h1>
        )
    }
}

export class Friends extends Component {
    render() {
        return (
            <h1>Friends</h1>
        )
    }
}