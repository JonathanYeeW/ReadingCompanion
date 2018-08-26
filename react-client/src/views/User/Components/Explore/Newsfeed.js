// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

// Props (for Reviews Tab)
// - userid

import React, { Component } from 'react';

var newsfeedManager = require('../../../../controllers/newsfeedManager')

export class Newsfeed extends Component {
    constructor(props) {
        super(props);
        console.log("## Newsfeed ## props:", this.props)
        this.state = {
            newsfeed: []
        }
        this.fetchAllNewsfeedObjects()
    }

    fetchAllNewsfeedObjects = () => {
        console.log("## Newsfeed ## fetchAllNewsfeedObjects")
        newsfeedManager.fetchAllNewsfeedObjects()
            .then(res => {
                this.setState({
                    newsfeed: res.newsfeed_objects
                })
            })
    }

    createNewsfeedObject = () => {
        console.log("## newsfeedManager ## createNewsfeedObject()")
        const typedict = { 0: "Post", 1: "User", 2: "Book" }
        const data = {
            title: "title1",
            by_userid: "user_id1",
            by_username: "username1",
            type: typedict[Math.floor(Math.random() * 3)],
            type_id: "type_id1",
            type_title: "type_title1",
        }
        newsfeedManager.createNewsfeedObject(data)
            .then(this.fetchAllNewsfeedObjects())
    }

    deleteAllNewsfeedObjects = () => {
        console.log("## newsfeedManager ## deleteAllNewsfeedObjects()")
        newsfeedManager.deleteAllNewsfeedObjects()
            .then(this.fetchAllNewsfeedObjects())
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h4>Temporary Newsfeed Admin Controller</h4>
                    <div className="btn-toolbar">
                        <div className="btn-group mr-2">
                            <button className="btn btn-info" onClick={() => this.fetchAllNewsfeedObjects()}> Get All Newsfeed Objects</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-success" onClick={() => this.createNewsfeedObject()}> Create New Newsfeed Object</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-danger" onClick={() => this.deleteAllNewsfeedObjects()}> Delete New Newsfeed Object</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        this.state.newsfeed.map(item => {
                            return (
                                <div key={item._id} className="col-12">
                                    <Item
                                        item={item}
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

export class Item extends Component {
    render() {
        let body;
        if (this.props.item.type === "Post") {
            body =
                <div className="row">
                    <div className="col-4">
                        <h4>Post Title: {this.props.item.title}</h4>
                    </div>
                    <div className="col-4">
                        <h4>Author: {this.props.item.by_username}</h4>
                    </div>
                    <div className="col-4">
                        <button className="btn">Read</button>
                    </div>
                </div>
        } else if (this.props.item.type === "User") {
            body = <h4 className="text-success">{this.props.item.by_username} added {this.props.item.type_title} as a friend</h4>
        } else if (this.props.item.type === "Book") {
            body = <h4 className="text-info">{this.props.item.by_username} added {this.props.item.type_title} to his/her library</h4>
        }
        return (
            <div>
                {body}
            </div>
        )
    }
}
