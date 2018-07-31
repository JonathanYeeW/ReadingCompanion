// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';
import { Spotlight } from './Components/Spotlight';
import { UserInfo } from './Components/UserInfo';
import { UserBooks } from './Components/UserBooks';
import { Discover } from './Components/Discover';
import { CreateBook } from './Components/CreateBook';
import { GoogleSearch } from './Components/GoogleSearch';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.userid,
            books: [],
            newBook: undefined,
            firstname: "",
            lastname: "",
            createBook: false,
            discover: true,
        }
        this.fetchUserData()
        this.fetchUserBooks()
        console.log(this.state.newBook)
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
        console.log("Fetching User Books")
        const temp = { userid: this.props.userid }
        fetch('/users/getuserbooks', {
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
        console.log("Create book with title", data.title, "and author", data.author)
        data["userid"] = this.state.userid
        fetch('/users/createBook', {
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
        console.log("I want to delete a book with id", data)
        fetch('/users/deleteBook', {
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
        console.log("I want to delete a book with id", data)
        fetch('/users/removeBook', {
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
        fetch('/users/discoverBook', {
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
        console.log("addBookFromDiscover")
        fetch('/users/addBook', {
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

    render() {
        return (
            <div id="dashboard-container" className="container">

                <div className="row pb-4">
                    <div className="col-6">
                        <div className="card bg-dark dashboard-width-fill dashboard-height-fill">
                            <div className="card-body dashboard-height-fill">
                                <UserInfo
                                    appstate={this.state}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card bg-dark dashboard-width-fill dashboard-height-fill">
                            <div className="card-body dashboard-height-fill">
                                <Spotlight />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">

                        <div className="card bg-dark dashboard-width-fill">
                            <div className="card-body ">
                                <div className="row">
                                    <div className="col-4">
                                        <CreateBook
                                            appstate={this.state}
                                            createBook={this.createBook}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <Discover
                                            discoverBook={this.discoverBook}
                                            addBook={this.addBookFromDiscover}
                                            newBook={this.state.newBook}
                                            appstate={this.state}
                                            createBook={this.createBook}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <GoogleSearch 
                                            createBook={this.createBook}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card bg-dark dashboard-width-fill">
                            <div className="card-body">
                                <UserBooks
                                    books={this.state.books}
                                    deleteBook={this.deleteBook}
                                    removeBook={this.removeBook}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}//End Dashboard

export default Dashboard;