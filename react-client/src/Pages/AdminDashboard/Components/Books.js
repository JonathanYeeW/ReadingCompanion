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
        } else {
            body = undefined
        }

        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <h4>Books</h4>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <button className="btn btn-secondary" onClick={() => this.expand()}>Expand</button>
                        </div>
                    </div>
                </div>
                {body}
            </div>
        )
    }
}

export default Books;