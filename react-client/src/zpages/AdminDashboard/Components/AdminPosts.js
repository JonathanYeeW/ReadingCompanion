import React, { Component } from 'react';
import { Post } from '../../Post';

export class AdminPosts extends Component {
    constructor(props) {
        super(props);
        this.getPostsAllPosts()
    }

    state = {
        expansion: false,
        posts: []
    }

    expand = () => {
        this.setState({
            expansion: !this.state.expansion
        })
    }

    getPostsAllPosts = () => {
        fetch('/posts/')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    posts: res.posts
                })
            })
    }

    render() {
        let body;
        if (this.state.expansion) {
            //expand is true
            body =
                <div className="card-body">
                    {
                        this.state.posts.map(post => {
                            return (
                                <div className="mb-3" key={post._id}>
                                    <Post
                                        post={post}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
        } else {
            body = undefined
        }

        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <h4>Posts</h4>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <button className="btn btn-secondary" onClick={() => this.expand()}>Expand</button>
                        </div>
                    </div>
                </div>
                {body}
            </div>
        )
    }
}

export default AdminPosts;