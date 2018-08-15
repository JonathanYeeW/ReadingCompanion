import React, { Component } from 'react';

// Props (from UserDashboard.js):
// - bookid (optional)

export class Reader extends Component {
    constructor(props) {
        super(props);
        console.log("## ReaderView ## props:", this.props)
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