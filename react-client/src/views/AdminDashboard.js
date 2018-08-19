// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';

export class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        console.log("## AdminDashboard ## props:", this.props)
    }

    render(){
        return(
            <div className="container">
                <h1>AdminDashboard</h1>
                <div className="row">
                    <div className="col-4">
                        <p>Books: #</p>
                        <p>Users: #</p>
                        <p>Reviews: #</p>
                        <p>Site Visits: #</p>
                    </div>
                    <div className="col-8">
                        <button className="btn btn-danger">Delete Books</button>
                        <button className="btn btn-danger">Delete Users</button>
                        <button className="btn btn-danger">Delete Reviews</button>
                    </div>
                </div>
                <div className="row">
                    <h3>Users</h3>
                    <p>User Name, User ID, Delete Button</p>
                </div>
                <div className="row">
                    <h3>Books</h3>
                    <p>ISBN Number, Delete Button, likes</p>
                </div>
                <div className="row">
                    <h3>Reviews</h3>
                    <p>Flagged?, Delete Button, User Posted, Likes</p>
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