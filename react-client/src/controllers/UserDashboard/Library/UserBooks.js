import React, { Component } from 'react';

// Props (from UserDashboard.js):
// userid

// Todos
// - create a fetch all user books function that fires
//   in the contructor
// - create a remove book function that i add to the book

export class UserBooks extends Component {
    constructor(props) {
        super(props);
        console.log("## UserBooks.js ## props:", this.props)
        this.fetchUserBooks()
    }

    state = {
        books: []
    }

    fetchUserBooks = () => {
        console.log("## UserBooks.js ## fetchUserBooks")
        fetch('/books/usercollection', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ userid: this.props.userid })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    books: res["books"]
                })
            }
            )
    }

    render() {
        let body;
        if (this.state.books.length !== 0) {
            body =
                <div className="row">
                    {
                        this.state.books.map(book => {
                            return (
                                <div className="col-4 pb-3">
                                    <Book
                                        book={book}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
        } else {
            body =
                <div>
                    <h5>You have no books! Go Add Some!</h5>
                </div>
        }

        return (
            <div>
                <div className="card bg-light">
                    <div className="card-header">
                        <div className="row">
                            <div className="d-flex justify-content-start">
                                <h4>User Books</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body dashboard-width-fill">
                        <div className="row">
                            {body}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserBooks;

export class Book extends Component {
    render() {
        return (
            <div>
                <div className="card bg-info border-dark text-white">
                    <div className="card-header">
                        <p className="card-text">{this.props.book.title}</p>
                    </div>
                    <div className="card-body">
                        <p className="card-text text-white">{this.props.book.author}</p>
                    </div>
                </div>
            </div>
        )
    }
}