import React, { Component } from 'react';

// props (from UserDashboard.js):
// userid

var bookManager = require('../../../../controllers/bookManager')

export class Discover extends Component {
    constructor(props) {
        super(props);
        console.log("## Discover.js ##, props:", this.props)
        this.state = {
            newBook: undefined
        }
        this.discoverBook()
    }
    
    // function queries the database with the userid
    // and returns all the books that's in the database
    // that this user doesn't have in their library
    discoverBook = () => {
        console.log("## Discover.js ## discoverBook")
        bookManager.discoverBook(this.props.userid)
            .then(res => {
                console.log(res)
                this.setState({
                    newBook: res.newBook
                })
            })
    }

    // function for when a user likes the book they 
    // see through the discover component, they can 
    // add it to their library. Needs the user id as 
    // well as the book id that it's adding.
    addBook = () => {
        console.log("## Discover.js ## addBook")
        let data = { id: this.state.newBook._id, userid: this.props.userid }
        bookManager.addBook(data)
            .then(this.discoverBook())
    }

    render() {
        let body;
        if (this.state.newBook) {
            body = <div>
                <p>Title: {this.state.newBook.title}</p>
                <p>Author: {this.state.newBook.author}</p>
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