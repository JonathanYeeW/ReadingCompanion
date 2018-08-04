import React, { Component } from 'react';

// props (from UserDashboard.js):
// userid

export class Discover extends Component {
    constructor(props) {
        super(props);
        this.setState({
            newbook: undefined,
        })
        this.discoverBook()
    }

    // function queries the database with the userid
    // and returns all the books that's in the database
    // that this user doesn't have in their library
    discoverBook = () => {
        fetch('/books/discover', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ id: this.props.userid })
        })
            .then(res => res.json())
            .then(res => this.setState({
                newBook: res.newBook
            }))
    }

    // function for when a user likes the book they 
    // see through the discover component, they can 
    // add it to their library. Needs the user id as 
    // well as the book id that it's adding.
    addBook = () => {
        fetch('/books/add', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ id: this.state.newBook._id, userid: this.prop.userid })
        })
            .then(res => res.json())
            .then(res => {
                this.fetchUserBooks()
                this.discoverBook()
            })
    }

    render() {
        let body;
        if (this.props.newBook) {
            body = <div>
                <p>Title: {this.props.newBook.title}</p>
                <p>Author: {this.props.newBook.author}</p>
                <div className="btn-toolbar" role="toolbar">
                    <div className="btn-group mr-2" role="group">
                        <button className="btn btn-outline-info" onClick={() => this.addBook()}>Add</button>
                    </div>
                    <div className="btn-group mr-2" role="group">
                        <button className="btn btn-outline-info" onClick={() => this.discoverBook()}>Pass</button>
                    </div>
                </div>
            </div>
        } else {
            body = <div>
                <p>Come back later for more book suggestions, or add your own book to the library!</p>
            </div>
        }

        return (
            <div className="card">
                <div className="card-header">
                    <h4>Discover</h4>
                </div>
                <div className="card-body dashboard-card-min-height">
                    {body}
                </div>
            </div>
        )
    }
}

export default Discover;