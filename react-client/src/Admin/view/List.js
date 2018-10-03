import React, { Component } from 'react';
const bookManager = require('../controller/bookManager')

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booklist: []
        }

        // on load, i want to fetch all book objects
        // from the database and populate it into the 
        // book list array
        this.populateBookList()
    }

    populateBookList = () => {
        console.log("## List.js ## populateBookList() ##")
        bookManager.getAllBooks()
            .then(res => {
                console.log(res)
                this.setState({
                    booklist: res.books
                })
            })
    }

    render() {
        return (
            <div>
                <hr />
                <h4>List</h4>
                <p>In this component, it displays all the information for every book currently in the database</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>RCID</th>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.booklist.map(item => {
                                return (
                                    <tr>
                                        <td>{item.RCID}</td>
                                        <td>{item.title}</td>
                                        <td>{item.author}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                {/* {
                    this.state.books.map(book => {
                        return (
                            <div key={book._id} className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-3">
                                <Book
                                    book={book}
                                    removeBookFromUser={this.removeBookFromUser}
                                />
                            </div>
                        )
                    })
                } */}

            </div>
        )
    }
}

export default List;
