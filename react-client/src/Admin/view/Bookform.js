import React, { Component } from 'react';
import Header from './Header';
import List from './List';
const bookManager = require('../controller/bookManager')
const emptyBook = {
    rcid: "",
    title: "",
    author: "",
    genre: "",
    subgenre: "",
    fiction: "",
    isbn10: "",
    isbn13: "",
    description: "",
    edition: "",
    pages: "",
    language: "",
    publisher: "",
    publishingDate: "",
    hardcover: "",
    image: "",
    created_at: "",
    updated_at: "",
}

class Bookform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: emptyBook,
        }
        console.log("## Bookform.js ## props:", props)
    }

    findBookByRcid = event => {
        console.log("## List.js ## findBookByRcid() ##")
        event.preventDefault()
        console.log(event.target.rcid.value)
        bookManager.findBookByRcid(event.target.rcid.value)
            .then(res => {
                let fetchedBook = res.book[0]
                if(fetchedBook !== undefined){
                    this.setState({
                        book: res.book[0]
                    })
                } else {
                    this.setState({
                        book: emptyBook
                    })
                }
            })
        .catch(console.log("There was an error findBookByRcid"))
    }

    render() {
        return (
            <div>
                <Header />
                <div className="btn-toolbar pb-3" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group mr-2" role="group">
                        <button type="button" className="btn btn-secondary">Create</button>
                    </div>
                    <div className="btn-group mr-2" role="group">
                        <button type="button" className="btn btn-secondary">Read</button>
                    </div>
                    <div className="btn-group mr-2" role="group">
                        <button type="button" className="btn btn-secondary">Update</button>
                    </div>
                    <div className="btn-group mr-2" role="group">
                        <button type="button" className="btn btn-secondary">Delete</button>
                    </div>
                </div>

                <div className="row pb-3">
                    <div className="col-4">
                        <form className="form" onSubmit={(event) => this.findBookByRcid(event)}>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">RCID#</div>
                                </div>
                                <input type="text" name="rcid" className="form-control" />
                                <button className="btn btn-secondary ml-2">Search</button>
                            </div>
                        </form>
                    </div>
                </div>

                <h3>Book Form</h3>
                <form>
                    <div className="row">
                        <div className="col-3">
                            <div className="form-group">
                                <label>Title:</label>
                                <input type="text" className="form-control" value={this.state.book.title} />
                            </div>
                            <div className="form-group">
                                <label>Author:</label>
                                <input type="email" className="form-control" value={this.state.book.author} />
                            </div>
                            <div className="form-group">
                                <label>Genre:</label>
                                <input type="email" className="form-control" value={this.state.book.genre} />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label>Subgenre:</label>
                                <input type="email" className="form-control" value={this.state.book.subgenre} />
                            </div>
                            <div className="form-group">
                                <label>Fiction</label>
                                <input type="email" className="form-control" value={this.state.book.fiction} />
                            </div>
                            <div className="form-group">
                                <label>ISBN10:</label>
                                <input type="email" className="form-control" value={this.state.book.isbn10} />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label>ISBN13:</label>
                                <input type="email" className="form-control" value={this.state.book.isbn13} />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <input type="email" className="form-control" value={this.state.book.description} />
                            </div>
                            <div className="form-group">
                                <label>Edition:</label>
                                <input type="email" className="form-control" value={this.state.book.edition} />
                            </div>
                            <div className="form-group">
                                <label>Hardcover:</label>
                                <input type="email" className="form-control" value={this.state.book.hardcover} />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label>Language:</label>
                                <input type="email" className="form-control" value={this.state.book.language} />
                            </div>
                            <div className="form-group">
                                <label>Publisher:</label>
                                <input type="email" className="form-control" value={this.state.book.publisher} />
                            </div>
                            <div className="form-group">
                                <label>Published Date:</label>
                                <input type="email" className="form-control" value={this.state.book.publishingDate} />
                            </div>
                            <div className="form-group">
                                <label>Image:</label>
                                <input type="email" className="form-control" value={this.state.book.image} />
                            </div>
                        </div>
                    </div>
                </form>
                <List />
            </div>
        )
    }
}

export default Bookform;
