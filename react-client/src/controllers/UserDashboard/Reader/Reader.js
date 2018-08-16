import React, { Component } from 'react';

// Props (from UserDashboard.js):
// - bookid (optional)

var userManager = require('../../userManager')

export class Reader extends Component {
    constructor(props) {
        super(props);
        console.log("## ReaderView ## props:", this.props)
        this.helloWorld()
    }

    helloWorld = async () => {
        userManager.getAllUsers()
            .then(res => console.log("here at helloworld", res))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h1>Reader View</h1>
            </div>
        )
    }
}

export default Reader;