import React, { Component } from 'react';

// PROPS:
// appstate
// - books: array
// - createBook: bool
// - discover: bool
// - firstname: string
// - lastname: string
// - newBook: object/undefined
// - userid: string

export class UserInfo extends Component {
    constructor(props){
        super(props);
        console.log(this.props)
    }

    render() {
        return (
            <div className="card bg-light dashboard-height-fill">
                <div className="card-header"><h4>{this.props.appstate.firstname} {this.props.appstate.lastname}</h4></div>
                <div className="card-body">
                    <p><span className="font-weight-bold">Library Size: </span>{this.props.appstate.books.length}</p>
                    <p># Books in my Wishlist</p>
                    <p># Books I've Read</p>
                </div>
            </div>
        )
    }
}

export default UserInfo;