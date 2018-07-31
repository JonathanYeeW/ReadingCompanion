import React, { Component } from 'react';

export class CreateBook extends Component {
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

    createBook = (event) => {
        console.log("createBook")
        event.preventDefault()
        let temp = { title: this.state.title, author: this.state.author }
        this.props.createBook(temp)
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h4>Create Book</h4>
                </div>
                <div className="card-body dashboard-card-min-height">
                    <form onSubmit={(event) => { this.createBook(event) }}>
                        <div className="form-group">
                            <input type="text" className="form-control" value={this.state.title} placeholder="Title" name="title" onChange={this.titleChange} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" value={this.state.author} placeholder="Author" name="author" onChange={this.authorChange} />
                        </div>
                        <button className="btn btn-outline-success">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateBook;