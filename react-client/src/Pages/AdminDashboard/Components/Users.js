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

    deleteUser = (event) => {
        let data = { userid: event }
        console.log("delete the user", data)
        fetch('/users/delete', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.props.getAllUsers()
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
                                    <th>Actions</th>
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
                                            <td>
                                                <div className="btn-toolbar">
                                                    <div className="btn-group">
                                                        <button className="btn btn-danger" onClick={() => this.deleteUser(user._id)}>Delete</button>
                                                    </div>
                                                </div>
                                            </td>
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