import React, { Component } from 'react';

// Props
// - userid
// - fetchUserBooks | To reload parent component when i create a new book
// - username | need to send it with new book for newsfeed

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

    toggleScreen = () => {
        console.log("## CreateBook ## toggleScreen()")
        if (this.state.screen !== 3) {
            this.setState({
                screen: this.state.screen + 1
            })
        } else {
            this.setState({
                screen: 0
            })
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
                        />
                    </div>
                break;
            case (3):
                body =
                    <div>
                        <RequestScreen />
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
                    </div>
                    <div className="card-body dashboard-card-min-height">
                        {body}
                    </div>
                    <div className="card-footer">
                        <button className="btn" onClick={() => this.toggleScreen()}> Developer MERP Next Button </button>
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
                                    <button className="btn btn-outline-primary">Add to Library</button>
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

        this.setState({
            books: data.items
        })
        // Figure Out Pagination
        // Have an error message if Google Books API is down or cannot be reached
    }

    render() {
        return (
            <div>
                <h4>GoogleBooksAPI Screen</h4>
                {
                    this.state.books.map(book => {
                        return (
                            <div>
                                <p>Title: {book.volumeInfo.title}</p>
                                <p>Author(s): {book.volumeInfo.authors}</p>
                                <button className="btn btn-outline-warning">Add To Master Library</button>
                                <hr />
                            </div>
                        )
                    })
                }
                <button className="btn btn-outline-danger" onClick={() => this.props.toggleScreen()}>Still Not Here?</button>
            </div>
        )
    }
}

export class RequestScreen extends Component {
    render() {
        return (
            <div>
                <h3>Request Master Librarians to Add</h3>
                <p>If you still haven't been able to find your book, please submit a request for the 
                    master librarians to add the book to the library. Your request will be responded to
                    so keep an eye out for a message in your inbox/notifications!
                </p>
                <p>Form Here</p>
            </div>
        )
    }
}