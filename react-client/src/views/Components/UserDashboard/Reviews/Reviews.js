// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

// Props (for Reviews Tab)
// - userid

import React, { Component } from 'react';

export class Reviews extends Component {
    constructor(props) {
        super(props);
        console.log("## Newsfeed ## props:", this.props)
        this.state = {
            posts: []
        }
        this.getPostsForUser(this.props.userid)
    }

    // function that queries the database and gets all of the 
    // posts that are associate with the user. 
    getPostsForUser = (data) => {
        if (data === undefined) {
            fetch('/posts/')
                .then(res => res.json())
                .then(res => {
                    console.log(res.posts)
                    this.setState({
                        posts: res.posts
                    })
                })
        } else {
            const temp = { userid: data }
            fetch('/posts/userid', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(temp)
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        posts: res.posts
                    })
                })
        }
    }

    render() {
        return (
            <div id="newsfeed-wrapper" className="card dashboard-height-fill">
                <div className="card-body bg-white dashboard-height-fill">
                    {
                        this.state.posts.map(post => {
                            return (
                                <div key={post._id} className="mb-3">
                                    <Post
                                        post={post}
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
                                <p>title: {this.props.post.title}</p>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <button className="btn btn-secondary" onClick={() => this.expand()}>Expand</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <p className="card-text text-muted">userid: {this.props.post.userid}</p>
                        <p className="card-text text-muted">username: {this.props.post.username}</p>
                        <p className="card-text text-muted">created_At: {this.props.post.created_At}</p>
                        <p className="card-text">post: {this.props.post.post}</p>
                    </div>
                </div>
        } else {
            body =
                <div>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6 d-flex justify-content-start">
                                <p> {this.props.post.title}</p>
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