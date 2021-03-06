import React, { Component } from 'react';

//TODOS

// Props (from UserDashboard.js):
// - userid

var counter = 0;

export class GoogleSearch extends Component {
    state = {
        books: [],
        error: undefined,
    }

    increaseCounter = () => {
        let bookLength = this.state.books.length
        counter += 1
        if (counter >= bookLength) {
            counter = 0
        }
        this.forceUpdate()
    }

    makeAPICall = async (searchParams, searchTerms) => {
        //MARK: Prepare for the API Call
        this.setState({
            error: "Fetching data now..."
        })
        const dict = {
            "title": "intitle:",
            "author": "inauthor:",
            "subject": "subject:"
        }
        let temp1 = dict[searchParams]
        let temp = ""
        for (let i = 0; i < searchTerms.length; i++) {
            if (i !== searchTerms.length - 1) {
                temp = temp + temp1 + searchTerms[i] + "+"
            } else {
                temp = temp + temp1 + searchTerms[i]
            }
        }

        //MARK: Make the API Call
        const apiAddress = 'https://www.googleapis.com/books/v1/volumes?q=' + temp + '&printType=books&langRestrict=en'
        const api_call = await fetch(apiAddress)
        const data = await api_call.json()
        // console.log("Data returned is", data)

        //MARK: Manage the Data Returned
        let newBooks = []
        if (data.totalItems !== 0) {
            for (let i = 0; i < data.items.length; i++) {
                let newBookObject = {}
                this.createNewBookObject(newBookObject, data.items[i])
                newBooks.push(newBookObject)
            }
            this.setState({
                books: newBooks,
                error: "You Found Results!"
            })
        } else {
            newBooks = []
            this.setState({
                books: newBooks,
                error: "Your Search Found No Results :("
            })
        }
    }//End makeAPICall()


    // this function is part of handling the data from the API call.
    // what happens is after i grab the data from GoogleBooks, it
    // comes back in this big chunk. But separating it into 
    // managable chunks (bookobjects), i can then put them in an array 
    // that i can use for data manipulation
    createNewBookObject = (bookObject, data) => {
        //Volume Info
        if (data.volumeInfo !== undefined) {
            if (data.volumeInfo.title !== undefined) {
                bookObject["title"] = data.volumeInfo.title
            }
            if (data.volumeInfo.authors !== undefined) {
                bookObject["author"] = data.volumeInfo.authors
            }
            if (data.volumeInfo.publisher !== undefined) {
                bookObject["publisher"] = data.volumeInfo.publisher
            }
            if (data.volumeInfo.publishedDate !== undefined) {
                bookObject["pubdate"] = data.volumeInfo.publishedDate
            }
            if (data.volumeInfo.description !== undefined) {
                bookObject["description"] = data.volumeInfo.description
            }
            if (data.volumeInfo.infoLink !== undefined) {
                bookObject["infoLink"] = data.volumeInfo.infoLink
            }
            if (data.volumeInfo.previewLink !== undefined) {
                bookObject["previewLink"] = data.volumeInfo.previewLink
            }
        }

        //SaleInfo
        if (data.saleInfo !== undefined) {
            if (data.saleInfo.buyLink !== undefined) {
                bookObject["buyLink"] = data.saleInfo.buyLink
            }
            if (data.saleInfo.listPrice !== undefined) {
                if (data.saleInfo.listPrice.amount !== undefined) {
                    bookObject["listPrice"] = data.saleInfo.listPrice.amount
                }
            }
            if (data.saleInfo.retailPrice !== undefined) {
                if (data.saleInfo.retailPrice.amount !== undefined) {
                    bookObject["retailPrice"] = data.saleInfo.retailPrice.amount
                }
            }
        }

        //accessInfo
        if (data.accessInfo !== undefined) {
            if (data.accessInfo.webReaderLink !== undefined) {
                bookObject["webreaderLink"] = data.accessInfo.webReaderLink
            }
        }

    }

    handleSubmit = (event) => {
        event.preventDefault();
        let searchParams = event.target.searchParams.value;

        let searchTerms = event.target.input.value
        searchTerms = searchTerms.split(" ").reverse()

        if (event.target.input.value.length === 0) {
            this.setState({
                error: "Please enter a search term"
            })
        } else {
            this.makeAPICall(searchParams, searchTerms);
        }
    }//End handleSubmit()

    // this function creates a book object from this data and adds
    // it to the users library. I recieved the data from the button pressed 
    // and the form.
    createBook = () => {
        let data = { title: this.state.books[counter].title, author: this.state.books[counter].author[0], userid: this.props.userid }
        // MARK: What happens if there is no author?
        fetch('/books/create', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    title: "",
                    author: ""
                })
            })
    }


    render() {
        let body;
        if (this.state.books.length === 0) {
            body =
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="searchParams" id="inlineRadio1" value="title" defaultChecked />
                            <label className="form-check-label">Title</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="searchParams" id="inlineRadio2" value="author" />
                            <label className="form-check-label">Author</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="searchParams" id="inlineRadio3" value="subject" />
                            <label className="form-check-label">Subject</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="input" placeholder="search..." />
                    </div>
                    <input className="btn btn-outline-info" type="submit" />
                </form>
        } else {
            body =
                <div>
                    <div className="row mb-2">
                        <div className="btn-toolbar">
                            <div className="btn-group mr-2">
                                <button className="btn btn-info" onClick={() => {
                                    this.createBook()
                                    this.increaseCounter()
                                }}>Add</button>
                            </div>
                            <div className="btn-group mr-2">
                                <button className="btn btn-info" onClick={() => this.increaseCounter()}>Pass {counter + 1}/{this.state.books.length}</button>
                            </div>
                            <div className="btn-group mr-2">
                                <button className="btn btn-info" onClick={() => this.setState({ books: [], error: undefined })}>New Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <p>{this.state.books[counter].title}</p>
                        <p>{this.state.books[counter].author}</p>
                        <p>{this.state.books[counter].description}</p>
                    </div>
                </div>
        }

        return (
            <div className="card dashboard-width-fill">
                <div className="card-header">
                    <h4>Google Search</h4>
                </div>
                <div className="card-body dashboard-card-min-height">
                    <p className="text-muted">
                        {this.state.error}
                    </p>
                    {body}
                </div>
            </div>
        )
    }
}

export default GoogleSearch;