//PORT=3001 nodemon bin/www

import React, { Component } from 'react';

const bookManager = require('../src/controllers/bookManager')

class AddBookToLibrary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
        }
    }

    querylibrary = (event) => {
        console.log("## AddBookToLibrary ## querylibrary()")
        event.preventDefault()
        console.log("title looking for is", event.target.title.value)
        bookManager.getBooksByTitle(event.target.title.value)
            .then(res => {
                console.log(res)
                this.setState({
                    books: res.books
                })
            })
    }

    render() {
        let searchresults;

        if (this.state.books.length !== 0) {
            searchresults =
                <div>
                    {
                        this.state.books.map(book => {
                            return (
                                <div>
                                    <p>{book.title}, {book.author}</p>
                                </div>
                            )
                        })
                    }
                </div>
        } else {
            searchresults = 
            <p>No results i'm sorry</p>
        }

        return (
            <div className="container">

                <SearchScreen />
                <AvailableBooksScreen />
                <GoogleBooksAPIScreen />

            </div>
        )
    }

}

export default AddBookToLibrary;


class SearchScreen extends Component {
    render(){
        return(
            <div>
                <h4>Search Screen</h4>
            </div>
        )
    }
}

class AvailableBooksScreen extends Component {
    render(){
        return(
            <div>
                <h4>AvailableBooksScreen Screen</h4>
            </div>
        )
    }
}

class GoogleBooksAPIScreen extends Component {
    render(){
        return(
            <div>
                <h4>GoogleBooksAPIScreen Screen</h4>
            </div>
        )
    }
}
