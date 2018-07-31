// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';

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
        fetch('/users/books')
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

    createNewUser = (name) => {
        console.log("Create User", name)

        const temp = { "name": name }
        fetch('/users/create', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(temp)
        })
            .then(res => res.json())
            .then(res =>
                console.log(res)
            );
    }

    deleteAllUsers = () => {
        console.log("Delete All users")
        fetch('/users/deleteAll')
            .then(res => res.json())
            .then(res =>
                console.log(res)
            );
    }

    deleteAllBooks = () => {
        console.log("Delete ALl Books")
        fetch('/users/deleteAllBooks')
            .then(res => res.json())
            .then(res => console.log(res))
    }

    submitNewUserForm = (event) => {
        event.preventDefault()
        console.log("Submit new user form")
        console.log(event.target.username.value)
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
                <div className="row">
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
            </div>
        );
    }
}

export class Users extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h4>Users</h4>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.users.length > 0 &&
                                this.props.users.map(user => {
                                    return <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.password}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">
                    <div className="btn-toolbar">
                        <div className="btn-group mr-2">
                            <button className="btn btn-info" onClick={this.props.getAllUsers}>Refresh All Users</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-info" onClick={this.props.showUsers}>Console.Log All Users</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-info" onClick={this.props.deleteAllUsers}>Delete All Users</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class Books extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h4>Books</h4>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>All Users Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.books.length > 0 &&
                                this.props.books.map(book => {
                                    return <tr key={book._id}>
                                        <td>{book._id}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.allusers.length}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">
                    <div className="btn-toolbar">
                        <div className="btn-group mr-2">
                            <button className="btn btn-info" onClick={this.props.getAllBook}>Refresh All Books</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-info" onClick={this.props.showBooks}>Console.Log All Books</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-info" onClick={this.props.deleteAllBooks}>Delete All Books</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin;