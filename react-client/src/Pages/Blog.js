// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';

//THIS IS IMPORTED TO DASHBOARD

export class Blog extends Component {
    render() {
        return (
            <div>
                <h1>Blog</h1>
            </div>
        )
    }
}

export default Blog;

export class NewPost extends Component {
    render() {
        return (
            <div>
                <h1>New Post</h1>
            </div>
        )
    }
}