// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';
import { Post } from './Post';

export class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.getPostsForUser()
    }

    getPostsForUser = (event) => {
        if (event === undefined) {
            console.log("get all the posts")
            fetch('/posts/')
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        posts: res.posts
                    })
                })
        } else {
            console.log("I'm supposed to get specific posts")
        }
    }

    render() {
        return (
            <div id="newsfeed-wrapper" className="card">
                {/* <button className="btn" onClick={() => this.getPostsForUser()}> get Posts For User FUnction</button> */}
                <div className="card-body bg-white">
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

export default Newsfeed;