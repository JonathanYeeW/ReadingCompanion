import React, { Component } from 'react';

export class Discover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsfeed: false,
            reviews: false,
            explore: true
        }
        this.props.discoverBook()
    }

    discoverBook = () => {
        this.props.discoverBook()
    }

    addBook = () => {
        this.props.addBook()
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