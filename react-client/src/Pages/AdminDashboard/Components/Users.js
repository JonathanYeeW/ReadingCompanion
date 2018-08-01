import React, { Component } from 'react';

export class Users extends Component {
    state = {
        expansion: false
    }

    expand = () => {
        this.setState({
            expansion: !this.state.expansion
        })
    }

    render() {
        let body;
        if (this.state.expansion) {
            //If expansion is true
            body =
                <div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.users.length > 0 &&
                                    this.props.users.map(user => {
                                        return <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.email}</td>
                                            <td>{user.firstname}</td>
                                            <td>{user.lastname}</td>
                                            <td>{user.password}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer">
                        <div className="btn-toolbar">
                            <div className="btn-group mr-2">
                                <button className="btn btn-info" onClick={this.props.getAllUsers}>Refresh All Users</button>
                            </div>
                            <div className="btn-group mr-2">
                                <button className="btn btn-info" onClick={this.props.showUsers}>Console.Log All Users</button>
                            </div>
                            <div className="btn-group mr-2">
                                <button className="btn btn-info" onClick={this.props.deleteAllUsers}>Delete All Users</button>
                            </div>
                        </div>
                    </div>
                </div>
        } else {
            body = undefined
        }

        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <h4>Users</h4>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <button className="btn btn-secondary" onClick={() => this.expand()}>Expand</button>
                        </div>
                    </div>
                </div>
                {body}
            </div>
        )
    }
}

export default Users;