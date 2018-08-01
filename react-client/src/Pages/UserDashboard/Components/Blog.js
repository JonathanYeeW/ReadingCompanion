// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';

//THIS IS IMPORTED TO DASHBOARD

export class Blog extends Component {
    render() {
        return (
            <div className="card-body bg-dark">
                <div className="card">
                    <div className="card-header">
                        <h4>Blog</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit = {(event)=>event.preventDefault()}>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Title" name="title"/>
                            </div>
                            <div className="form-group">
                            <textarea class="form-control" placeholder="Blog Post" rows="10"></textarea>
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