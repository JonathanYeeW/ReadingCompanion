import React, { Component } from 'react';

export class Books extends Component {
    state = {
        expansion: false
    }

    expand = () => {
        this.setState({
            expansion: !this.state.expansion
        })
    }

    deleteBook = (bookid) => {
        console.log("Delete the book with id", bookid)
        fetch('/books/delete', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ id: bookid })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.props.getAllBook()
            })
    }

    render() {
        let body;
        if (this.state.expansion) {
            //expand is true
            body =
                <div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    {/* <th>id</th> */}
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>All Users Count</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.books.length > 0 &&
                                    this.props.books.map(book => {
                                        return <tr key={book._id}>
                                            {/* <td>{book._id}</td> */}
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.allusers.length}</td>
                                            <td><button className="btn btn-danger" onClick={() => this.deleteBook(book._id)}>Delete</button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer">

                    </div>
                </div>
        } else {
            body = undefined
        }

        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-4">
                            <h4>Books</h4>
                        </div>
                        <div className="col-8 d-flex justify-content-end">
                            <div className="btn-toolbar">
                                <div className="btn-group mr-2">
                                    <button className="btn btn-info" onClick={this.props.getAllBook}>Refresh</button>
                                </div>
                                <div className="btn-group mr-2">
                                    <button className="btn btn-info" onClick={this.props.deleteAllBooks}>Delete All</button>
                                </div>
                                <div className="btn-group mr-2">
                                    <button className="btn btn-secondary" onClick={() => this.expand()}>Expand</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {body}
            </div>
        )
    }
}

export default Books;