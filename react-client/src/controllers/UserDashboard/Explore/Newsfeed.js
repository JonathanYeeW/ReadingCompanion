// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';

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
                    console.log(res.posts)
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
            <div id="newsfeed-wrapper" className="card dashboard-height-fill">

                <h1>Newfeed will be here</h1>

                {/* <div className="card-body bg-white dashboard-height-fill">
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
                </div> */}
            </div>
        )
    }
}

export default Newsfeed;