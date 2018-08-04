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
        this.setState({
            books: [1,2,3,4],
        })
        console.log(this.state)
        // fetchAllUserBooks
    }

    state = {
        books: []
    }

    fetchUserBooks = () => {
        const temp = { userid: this.props.userid }
        fetch('/books/usercollection', {
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

    render() {
        let body;
        console.log(this.state)
        console.log(this.state.books.length)
        if (this.state.books.length !== 0) {
            body =
                <div>
                    {/* {
                        this.state.books.map(book => {
                            return (
                                <div className="col-4 pb-4">
                                    <Book
                                        book={book}
                                    />
                                </div>
                            )
                        })
                    } */}
                </div>
        } else {
            body = 
            <div>
                <h5>You have no books! Go get some!</h5>
            </div>
        }

        return (
            <div>
                <div className="card bg-light">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6 d-flex justify-content-start">
                                <h4>User Books</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
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