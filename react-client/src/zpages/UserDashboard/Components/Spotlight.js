import React, { Component } from 'react';

export class Spotlight extends Component {
    render() {
        return (
            <div className="card bg-light dashboard-width-fill dashboard-height-fill">
                <div className="card-header">
                    <h4>Currently Reading</h4>
                </div>
                <div className="card-body">
                    <p>Book Title</p>
                    <p>Book Author</p>
                    <p>Book Description</p>
                    <p>My Rating</p>
                    <p>Average Rating</p>
                    <p>Been Reading Since</p>
                </div>
            </div>
        )
    }
}

export default Spotlight;