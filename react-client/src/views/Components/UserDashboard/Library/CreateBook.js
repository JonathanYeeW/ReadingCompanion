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
            screen: 0
        }
    }

    toggleScreen = () => {
        console.log("## CreateBook ## toggleScreen()")
        if (this.state.screen !== 2) {
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
                        <SearchScreen />
                    </div>
                break
            case (1):
                body =
                    <div>
                        <ResultsScreen />
                    </div>
                break;
            case (2):
                body =
                    <div>
                        <GoogleBooksAPIScreen />
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
    render() {
        return (
            <div>
                <h4>Search Screen</h4>
                <form onSubmit={(event) => { event.preventDefault() }}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Title" name="title" />
                        <input type="submit" className="btn"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Author" name="author" />
                        <input type="submit" className="btn"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Genre" name="genre" />
                        <input type="submit" className="btn"/>
                    </div>
                </form>
            </div>
        )
    }
}

export class ResultsScreen extends Component {
    render() {
        return (
            <div>
                <h4>Results Screen</h4>
            </div>
        )
    }
}

export class GoogleBooksAPIScreen extends Component {
    render() {
        return (
            <div>
                <h4>GoogleBooksAPI Screen</h4>
            </div>
        )
    }
}