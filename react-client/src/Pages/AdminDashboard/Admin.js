// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';
import { Data } from './Components/Data';
import { Users } from './Components/Users';
import { Books } from './Components/Books';
import { AdminPosts } from './Components/AdminPosts';


export class Admin extends Component {
    constructor(props) {
        super(props);
        this.getAllUsers()
        this.getAllBooks()
        this.getAllPosts()
    }

    state = {
        users: [],
        username: "",
        text: "",
        books: [],
        posts: [],
    }

    repopulateDummyUsers = () => {
        for (let i = 0; i < superUsers.length; i++) {
            let body = {
                email: superUsers[i].email,
                firstname: superUsers[i].firstname,
                lastname: superUsers[i].lastname,
                password: superUsers[i].password
            }
            fetch('/users/create', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(this.getAllUsers())
        }
    }

    repopulateDummyBooks = () => {
        for (let i = 0; i < superBooks.length; i++) {
            let data =
            {
                title: superBooks[i].title,
                author: superBooks[i].title,
            }
            fetch('/books/create', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }
        this.getAllBooks()
    }

    getAllUsers = () => {
        fetch('/users')
            .then(res => res.json())
            .then(res => this.setState({
                users: res["users"]
            }))
        // this.forceUpdate()
    }

    getAllBooks = () => {
        fetch('/books/')
            .then(res => res.json())
            .then(res => this.setState({
                books: res["books"]
            }))
    }

    getAllPosts = () => {
        fetch('/posts/')
            .then(res => res.json())
            .then(res => this.setState({
                posts: res['posts']
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
            .then(res =>{
                console.log(res)
                this.getAllUsers()
            })
    }

    deleteAllBooks = () => {
        fetch('/books/deleteAll')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.getAllBooks()
            })
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
            <div>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-4">
                        <div className="card bg-dark">
                            <div className="card-body">
                                <Data
                                    totalUsers={this.state.users.length}
                                    totalBooks={this.state.books.length}
                                    totalPosts={this.state.posts.length}
                                />
                            </div>
                        </div>
                        <div className="card bg-dark">
                            <div className="card-body">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="btn-toolbar">
                                            <div className="btn-group mr-2">
                                                <button className="btn btn-warning" onClick={() => this.repopulateDummyUsers()}>Repopulate Dummy Users</button>
                                            </div>
                                            <div className="btn-group mr-2">
                                                <button className="btn btn-warning" onClick={() => this.repopulateDummyBooks()}>Repopulate Dummy Books</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row mb-5">
                            <div className="card bg-dark col-12">
                                <div className="card-body">
                                    <Users
                                        users={this.state.users}
                                        getAllUsers={this.getAllUsers}
                                        showUsers={this.showUsers}
                                        deleteAllUsers={this.deleteAllUsers}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="card bg-dark col-12">
                                <div className="card-body">
                                    <Books
                                        books={this.state.books}
                                        getAllBook={this.getAllBooks}
                                        showBooks={this.showBooks}
                                        deleteAllBooks={this.deleteAllBooks}
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
                    <div className="col-1"></div>
                </div>
            </div>
        );
    }
}

export default Admin;

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