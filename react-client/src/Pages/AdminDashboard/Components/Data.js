// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';

export class Data extends Component {
    render() {
        return (
            <div id="data-wrapper" className="card bg-white">
                <div className="card-header"><h4>Data Feed</h4></div>
                <div className="card-body">
                    <p className="card-text">Total Users</p>
                    <p className="card-text">Total Books</p>
                    <p className="card-text">Total Posts</p>
                    <p className="card-text">Total Page Views</p>
                </div>
            </div>
        )
    }
}

export default Data;