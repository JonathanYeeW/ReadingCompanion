// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';
import { Newsfeed } from '../Newsfeed';
import { Data } from './Components/Data';
import { Users } from './Components/Users';
import { Books } from './Components/Books';
import { AdminPosts } from './Components/AdminPosts';

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.getAllUsers()
        this.getAllBooks()
    }

    state = {
        users: [],
        username: "",
        text: "",
        books: [],
    }

    getAllUsers = () => {
        fetch('/users')
            .then(res => res.json())
            .then(res => this.setState({
                users: res["users"]
            }))
        this.forceUpdate()
    }

    getAllBooks = () => {
        fetch('/books')
            .then(res => res.json())
            .then(res => this.setState({
                books: res["books"]
            }))
    }

    showUsers = () => {
        console.log(this.state.users)
    }

    showBooks = () => {
        console.log(this.state.books)
    }

    deleteAllUsers = () => {
        fetch('/users/deleteAll')
            .then(res => res.json())
            .then(res =>
                console.log(res)
            );
    }

    deleteAllBooks = () => {
        fetch('/books/deleteAll')
            .then(res => res.json())
            .then(res => console.log(res))
    }

    submitNewUserForm = (event) => {
        event.preventDefault()
        this.createNewUser(event.target.username.value)
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    componentDidMount = () => {
        this.getAllUsers()

    }

    render() {
        return (
            <div className="container">
                <div className="row mb-5">
                    <div className="col-4">
                        <div className="card bg-dark">
                            <div className="card-body">
                                <Data />
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="card bg-dark">
                            <div className="card-body">
                                <Newsfeed />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="card bg-dark col-12">
                        <div className="card-body">
                            <Users
                                users={this.state.users}
                                getAllUsers = {this.getAllUsers}
                                showUsers = {this.showUsers}
                                deleteAllUsers = {this.deleteAllUsers}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="card bg-dark col-12">
                        <div className="card-body">
                            <Books
                                books={this.state.books}
                                getAllBook = {this.getAllBooks}
                                showBooks = {this.showBooks}
                                deleteAllBooks = {this.deleteAllBooks}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="card bg-dark col-12">
                        <div className="card-body">
                            <AdminPosts
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;