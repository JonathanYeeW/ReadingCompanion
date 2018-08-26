// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';

let reviewManager = require('../../../../controllers/reviewManager')

// Props:
// - userid
// - username

export class CreateReview extends Component {
    constructor(props) {
        super(props);
        console.log("## CreateReview ## props:", this.props)
    }

    createReview = (event) => {
        console.log("## CreateReview ## createReview()")
        event.preventDefault()
        const data = { title: event.target.title.value, userid: this.props.userid, username: this.props.username, review: event.target.review.value }
        reviewManager.createReview(data)
        event.target.title.value = ""
        event.target.review.value = ""
    }

    render() {
        return (
            <div className="card-body bg-dark">
                <div className="card">
                    <div className="card-header">
                        <h4>Blog</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(event) => this.createReview(event)}>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Title" name="title" />
                            </div>
                            <div className="form-group">
                                <textarea class="form-control" placeholder="Blog Post" rows="10" name="review"></textarea>
                            </div>
                            <input type="submit" className="btn btn-outline-info" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateReview;