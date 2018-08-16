import React, { Component } from 'react';

export class SignIn extends Component {
    state = {
        email: "",
        password: "",
        confirm: undefined,
        userid: undefined,
    }

    emailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    passwordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    validateInputs = () => {
        console.log("## SignIn ## validateInputs")
        if (this.state.email !== "" && this.state.password !== "") {
            return true
        } else {
            this.setState({
                confirm: false
            })
            return false
        }
    }

    checkForUser = (event) => {
        console.log("## SignIn ## checkForUser")
        event.preventDefault()
        if (this.validateInputs() === true) {
            const body = {
                email: this.state.email,
                password: this.state.password,
            }
            fetch('/users/signin', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(res => this.setState({
                    confirm: res['confirm'],
                    userid: res["id"]
                }))
        }
    }

    componentDidUpdate() {
        if (this.state.confirm === true) {
            this.props.login(this.state.userid)
        }
    }

    render() {
        let error;
        if (this.state.confirm === false) {
            error = <div><p className="text-danger">Login Failed. Incorrect Email or Password</p></div>
        } else if (this.state.confirm === true) {
            error = <div><p className="text-success">Login Success!</p></div>
        }
        return (
            <div className="card bg-dark sticky-top">
                <div className="card-body">
                    <div className="card-header bg-light">
                        <h5>Sign In</h5>
                    </div>
                    <div className="card-body bg-white">
                        {error}
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.email} placeholder="Email" name="email" onChange={this.emailChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" value={this.state.password} placeholder="Password" name="password" onChange={this.passwordChange} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={this.checkForUser}>Sign In</button>
                        </form>
                    </div>
                    <div className="card-footer bg-light">
                        <a className="text-primary" onClick={(event) => {
                            event.preventDefault()
                            this.props.signInToggle()
                        }}>Don't Have An Account? Sign Up!</a>
                    </div>
                </div>
            </div>

        )
    }
}//End SignIn

export default SignIn;