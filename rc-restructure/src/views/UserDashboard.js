import React, { Component } from 'react';

class UserDashboard extends Component {
    render() {
        return (
            <div>
                <h3>Navbars</h3>
                <div className="row">
                    <div className="col-3">
                        <h3>Discover</h3>
                    </div>
                    <div className="col-9">
                        <h3>Newsfeed</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDashboard;
