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
        bookManager.deleteAllBooks()
        bookManager.populateDevelopmentBooks()
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
                <button className="btn btn-secondary" onClick={() => this.populateBookList()}>Refresh</button>
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
                                        <td>{item.rcid}</td>
                                        <td>{item.title}</td>
                                        <td>{item.author}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List;
