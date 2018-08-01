import React, { Component } from 'react';

// PROPS:
// books: array
// deleteBook: function()
// removeBook: function()

export class UserBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
        }
    }

    switchToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        let body;

        // MARK: Toggles when the expand button is clicked. True shows the users library,
        // false hides the library
        if (this.state.toggle) {
            body =
                <div className="card-body">
                    <div className="row">
                        {
                            this.props.books.map(book => {
                                return (
                                    <div className="col-4 pb-4">
                                        <Book
                                            book={book}
                                            removeBook={this.props.removeBook}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
        } else {
            body = <div></div>
        }

        return (
            <div className="card bg-light">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6 d-flex justify-content-start">
                            <h4>User Books</h4>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <button className="btn btn-outline-secondary" onClick={() => this.switchToggle()}>Expand</button>
                        </div>
                    </div>
                </div>
                {body}
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
                        <button className="btn btn-outline-light" onClick={() => this.props.removeBook(this.props.book._id)}>Remove</button>
                    </div>
                </div>
            </div>
        )
    }
}