// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

// Props (for Reviews Tab)
// - userid

import React, { Component } from 'react';
let reviewManager = require('../../../../controllers/reviewManager')

export class Reviews extends Component {
    constructor(props) {
        super(props);
        console.log("## Newsfeed ## props:", this.props)
        this.state = {
            reviews: []
        }
        this.getReviews(this.props.userid)
    }

    // function that queries the database and gets all of the 
    // posts that are associate with the user. 

    getReviews = (data) => {
        // data is userid
        if (data === undefined) {
            reviewManager.getAllReviews()
                .then(res => {
                    console.log(res.reviews)
                    this.setState({
                        reviews: res.reviews
                    })
                })
        } else {
            const temp = { userid: data }
            reviewManager.getUserReviews(temp)
                .then(res => {
                    this.setState({
                        reviews: res.reviews
                    })
                })
        }
    }

    render() {
        return (
            <div id="newsfeed-wrapper" className="card dashboard-height-fill">
                <div className="card-body bg-white dashboard-height-fill">
                    {
                        this.state.reviews.map(review => {
                            return (
                                <div key={review._id} className="mb-3">
                                    <Post
                                    review={review}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Reviews;

export class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expansion: false
        }
    }

    expand = () => {
        this.setState({
            expansion: !this.state.expansion
        })
    }

    render() {
        let body;
        if (this.state.expansion) {
            body =
                <div>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6 d-flex justify-content-start">
                                <p>title: {this.props.review.title}</p>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <button className="btn btn-secondary" onClick={() => this.expand()}>Expand</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <p className="card-text text-muted">userid: {this.props.review.userid}</p>
                        <p className="card-text text-muted">username: {this.props.review.username}</p>
                        <p className="card-text text-muted">created_At: {this.props.review.created_At}</p>
                        <p className="card-text">review: {this.props.review.post}</p>
                    </div>
                </div>
        } else {
            body =
                <div>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6 d-flex justify-content-start">
                                <p> {this.props.review.title}</p>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <button className="btn btn-outline-secondary" onClick={() => this.expand()}>Expand</button>
                            </div>
                        </div>
                    </div>
                </div>
        }
        return (
            <div className="card bg-info">
                {body}
            </div>
        )
    }
}