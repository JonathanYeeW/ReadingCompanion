import React, { Component } from 'react';

/*
ISBN 10 vs 13:

An ISBN is assigned to each edition and variation (except reprintings) 
of a book. ... The ISBN is 13 digits long if assigned on or after 1 January 2007, 
and 10 digits long if assigned before 2007. An International Standard Book Number 
consists of 4 parts (if it is a 10 digit ISBN) or 5 parts (for a 13 digit ISBN)

I want to use 13 as the primary, 
but 10 obviously as a secondary and store both whenever possible
*/

// Props
// - userid
// - fetchUserBooks | To reload parent component when i create a new book
// - username | need to send it with new book for newsfeed

var counter = 0

var bookManager = require('../../../../controllers/bookManager')

export class CreateBook extends Component {
    constructor(props) {
        super(props);
        console.log("## CreateBook.js ## props:", this.props)
        this.state = {
            screen: 0,
            books: [],
            searchType: "Title", // default "Title" so not to break the machine
            searchTerms: "Google",
        }
    }

    searchBooks = (data) => {
        // data = { keyword: String, type: String }
        console.log("## CreateBook ## searchBooks()")
        console.log("query with", data)

        switch (data.type) {
            case ("Title"):
                console.log("title")
                bookManager.getBooksByTitle(data.keyword)
                    .then(res => {
                        console.log(res)
                        this.setState({
                            books: res.books,
                            searchType: "Title",
                            searchTerms: data.keyword,
                        })
                    })
                break
            case ("Author"):
                console.log("author")
                bookManager.getBooksByAuthor(data.keyword)
                    .then(res => {
                        console.log(res)
                        this.setState({
                            books: res.books,
                            searchType: "Author",
                            searchTerms: data.keyword,
                        })
                    })
                break
            default:
                console.log("error")
        }

    }

    toggleScreen = (data) => {
        console.log("## CreateBook ## toggleScreen() data:", data)
        if (data !== undefined) {
            console.log("here")
            this.setState({
                screen: data
            })
        } else {
            if (this.state.screen !== 4) {
                this.setState({
                    screen: this.state.screen + 1
                })
            } else {
                this.setState({
                    screen: 0
                })
            }
        }
    }

    render() {
        let body;

        switch (this.state.screen) {
            case (0):
                body =
                    <div>
                        <SearchScreen
                            toggleScreen={this.toggleScreen}
                            searchBooks={this.searchBooks}
                        />
                    </div>
                break
            case (1):
                body =
                    <div>
                        <ResultsScreen
                            toggleScreen={this.toggleScreen}
                            books={this.state.books}
                        />
                    </div>
                break;
            case (2):
                body =
                    <div>
                        <GoogleBooksAPIScreen
                            toggleScreen={this.toggleScreen}
                            searchType={this.state.searchType}
                            searchTerms={this.state.searchTerms}
                            userid={this.props.userid}
                        />
                    </div>
                break;
            case (3):
                body =
                    <div>
                        <RequestScreen
                            toggleScreen={this.toggleScreen}
                        />
                    </div>
                break;
            case (4):
                body =
                    <div>
                        <SuccessScreen
                            toggleScreen={this.toggleScreen}
                        />
                    </div>
                break;
            default:
                body =
                    <div>
                        <p>Error</p>
                    </div>
        }

        return (
            <div className="container">
                <div className="card dashboard-width-fill">
                    <div className="card-header">
                        <h4>Create Book</h4>
                        {/* <button className="btn" onClick={() => this.toggleScreen()}> Developer MERP Next Button </button> */}
                    </div>
                    <div className="card-body dashboard-card-min-height">
                        {body}
                    </div>
                    <div className="card-footer">
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateBook;

export class SearchScreen extends Component {
    submitForm = (event) => {
        console.log("## CreateBook ## submitForm()")
        event.preventDefault()
        const data = {
            keyword: event.target.keyword.value,
            type: event.target.type.value,
        }
        this.props.searchBooks(data)
        this.props.toggleScreen()
    }

    render() {
        return (
            <div>
                <h4>Search Screen</h4>
                <p className="text-muted">Let's start by looking through the Master Library for the book you're looking for</p>
                <form onSubmit={(event) => { this.submitForm(event) }}>
                    <div className="form-group">
                        <label>Keyword</label>
                        <input type="text" name="keyword" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select className="form-control" name="type">
                            <option>Title</option>
                            <option>Author</option>
                        </select>
                    </div>
                    <input className="btn" type="submit" />
                </form>
            </div>
        )
    }
}

export class ResultsScreen extends Component {
    render() {
        let body;
        if (this.props.books.length === 0) {
            body =
                <p>No Books found in the Master Library</p>
        } else {
            body =
                <div>
                    {
                        this.props.books.map(book => {
                            return (
                                <div>
                                    <p>Title: {book.title}</p>
                                    <p>Author: {book.author}</p>
                                    <button className="btn btn-outline-primary" onClick={() => this.props.toggleScreen(4)}>Add to Library</button>
                                    <hr />
                                </div>
                            )
                        })
                    }
                </div>
        }

        return (
            <div>
                <h4>Results Screen</h4>
                {body}
                <button className="btn btn-outline-info" onClick={() => this.props.toggleScreen(0)}>modify search?</button>
                <button className="btn btn-outline-danger" onClick={() => this.props.toggleScreen()}>is the book not here?</button>
            </div>
        )
    }
}

export class GoogleBooksAPIScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
        this.searchGoogleBooksAPI()
    }

    returnkey = () => {
        return counter++
    }

    searchGoogleBooksAPI = async () => {
        console.log("## CreateBook ## searchGoogleBooksAPI()")

        // Step1: Prepare for call
        console.log("Looking for", this.props.searchType)
        const dict = {
            "Title": "intitle:",
            "Author": "inauthor:",
        }
        let temp1 = dict[this.props.searchType]
        let temp = ""
        let searchTerms = this.props.searchTerms.split(" ").reverse()
        console.log(searchTerms)
        for (let i = 0; i < searchTerms.length; i++) {
            if (i !== searchTerms.length - 1) {
                temp = temp + temp1 + searchTerms[i] + "+"
            } else {
                temp = temp + temp1 + searchTerms[i]
            }
        }
        console.log(temp)
        console.log(dict[this.props.searchType])

        // Step2: Make API Call
        const apiAddress = 'https://www.googleapis.com/books/v1/volumes?q=' + temp + '&printType=books&langRestrict=en'
        const api_call = await fetch(apiAddress)
        const data = await api_call.json()
        console.log(data)

        let tempitems = []
        if (data.items) {
            for (let i = 0; i < data.items.length; i++) {
                console.log(data.items[i])
                if (data.items[i].volumeInfo.industryIdentifiers) {
                    if (data.items[i].volumeInfo.industryIdentifiers[0] && data.items[i].volumeInfo.industryIdentifiers[1]) {
                        tempitems.push(data.items[i])
                    }
                }
            }
        }

        this.setState({
            books: tempitems
        })
        // Figure Out Pagination
        // Have an error message if Google Books API is down or cannot be reached
    }

    addBookToLibrary = (book) => {
        console.log("Adding this to library", book.volumeInfo)
        // create the book because we're sourcing from GoogleAPI
        const data = {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors,
            userid: this.props.userid,
            isbn10: book.volumeInfo.industryIdentifiers[0].identifier,
            isbn13: book.volumeInfo.industryIdentifiers[1].identifier,
        }
        console.log("#########################")
        console.log("#########################")
        console.log("#########################")
        console.log(data)
        bookManager.createBook(data)
            .then(res => console.log(res))

        this.props.toggleScreen(4)
    }

    render() {
        let body;
        if (this.state.books.length > 0) {
            body =
                <div>
                    {
                        this.state.books.map(book => {
                            return (
                                <div key={this.returnkey()}>
                                    <p>Title: {book.volumeInfo.title}</p>
                                    <p>Author(s): {book.volumeInfo.authors}</p>
                                    <p>ISBN10: {book.volumeInfo.industryIdentifiers[0].identifier}</p>
                                    <p>ISBN13: {book.volumeInfo.industryIdentifiers[1].identifier}</p>
                                    <button className="btn" onClick={() => {
                                        console.log(book.volumeInfo.industryIdentifiers)
                                    }}>Print Book</button>
                                    <button className="btn btn-outline-warning" onClick={() => this.addBookToLibrary(book)}>Add To Master Library</button>
                                    <hr />
                                </div>
                            )
                        })
                    }
                </div>
        } else {
            body =
                <p>Sorry, Nothing in Google Books API :(</p>
        }

        return (
            <div>
                <h4>GoogleBooksAPI Screen</h4>
                <p className="text-muted">If the book isn't already in the Master Library, let's look through Google's Library shall we?</p>
                {body}
                <button className="btn btn-outline-info" onClick={() => this.props.toggleScreen(0)}>Modify Search?</button>
                <button className="btn btn-outline-danger" onClick={() => this.props.toggleScreen()}>Still Not Here?</button>
            </div>
        )
    }
}

export class RequestScreen extends Component {

    submitRequestForm = (event) => {
        console.log("## CreateBook ## submitRequestForm()")
        event.preventDefault();
        this.props.toggleScreen(0)
    }

    render() {
        return (
            <div>
                <h3>Request Master Librarians to Add</h3>
                <p className="text-muted">It happens, sometimes we can find the book you're looking for. 
                    Submit a request form for it to be added and the Master Librarians will add it for you! 
                    We have to do it this way because we want to make sure we get the right information when 
                    adding it to the MASTER LIBRARY.
                </p>
                <form onSubmit={(event) => this.submitRequestForm(event)}>
                    <div className="form-group">
                        <label>Title of Book</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Author of Book</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>ISBN of Book</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Description and Any Relevant Links</label>
                        <textarea className="form-control" rows="5"></textarea>
                    </div>
                    <input type="submit" className="btn btn-outline-info" />
                </form>


            </div>
        )
    }
}

export class SuccessScreen extends Component {
    render() {
        return (
            <div>
                <h3>Congrats! You've successfully added the book to your library!</h3>
            </div>
        )
    }
}