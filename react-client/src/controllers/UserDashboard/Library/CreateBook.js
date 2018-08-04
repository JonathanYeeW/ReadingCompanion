import React, { Component } from 'react';

// Props
// - userid
// - fetchUserBooks | To reload parent component when i create a new book

export class CreateBook extends Component {
    constructor(props) {
        super(props);
        console.log("## CreateBook.js ## props:", this.props)
    }

    state = {
        title: "",
        author: "",
    }

    titleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    authorChange = (event) => {
        this.setState({
            author: event.target.value
        })
    }

    createBook = () => {
        let data = { title: this.state.title, author: this.state.author, userid: this.props.userid }
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
                this.props.fetchUserBooks()
                this.setState({
                    title: "",
                    author: ""
                })
            })
    }

    render() {
        let submitbutton;
        if (this.state.title === "" || this.state.author === "") {
            submitbutton = <button className="btn btn-outline-secondary">Submit</button>
        } else {
            submitbutton = <button onClick={() => { this.createBook() }} className="btn btn-outline-success">Submit</button>
        }

        return (
            <div className="card dashboard-width-fill">
                <div className="card-header">
                    <h4>Create Book</h4>
                </div>
                <div className="card-body dashboard-card-min-height">
                    <form onSubmit={(event) => { event.preventDefault() }}>
                        <div className="form-group">
                            <input type="text" className="form-control" value={this.state.title} placeholder="Title" name="title" onChange={this.titleChange} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" value={this.state.author} placeholder="Author" name="author" onChange={this.authorChange} />
                        </div>
                        {submitbutton}
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateBook;