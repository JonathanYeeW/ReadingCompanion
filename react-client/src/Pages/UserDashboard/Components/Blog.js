// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';

//THIS IS IMPORTED TO DASHBOARD

export class Blog extends Component {
    
    createBlogPost = (event) => {
        event.preventDefault()
        const data = {title: event.target.title.value, userid: this.props.userid, username: this.props.username, post: event.target.post.value}
        fetch('/posts/create', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }
    
    render() {
        return (
            <div className="card-body bg-dark">
                <div className="card">
                    <div className="card-header">
                        <h4>Blog</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit = {(event)=>this.createBlogPost(event)}>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Title" name="title"/>
                            </div>
                            <div className="form-group">
                            <textarea class="form-control" placeholder="Blog Post" rows="10" name="post"></textarea>
                            </div>
                            <input type="submit" className="btn btn-outline-info" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Blog;