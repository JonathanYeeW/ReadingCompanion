import React, { Component } from 'react';

var userManager = require('../../../controllers/userManager')

export class SignUp extends Component {
    state = {
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        confirmpassword: "",
        ready: false,
        passworderror: undefined,
        submissionerror: false,
        errormessage: "",
    }

    createNewUser = (event) => {
        event.preventDefault()
        const body = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
        }
        userManager.createNewUser(body)
            .then(res => {
                if (res.error === false) {
                    this.props.login(res.newUser._id)
                } else {
                    this.setState({
                        submissionerror: true,
                        errormessage: res.message
                    })
                }
            });
    }

    checkIfReady = () => {
        if (
            //Validate inputs exist
            this.state.firstname.length > 0 &&
            this.state.lastname.length > 0 &&
            this.state.password.length > 0 &&
            this.state.confirmpassword.length > 0 &&

            //Validate passwords match
            this.state.password === this.state.confirmpassword
        ) {
            this.setState({
                ready: true
            })
        }
    }

    confirmStillReady = () => {
        if (
            //Validate inputs exist
            this.state.firstname.length > 0 &&
            this.state.lastname.length > 0 &&
            this.state.password.length > 0 &&
            this.state.confirmpassword.length > 0 &&

            //Validate passwords match
            this.state.password === this.state.confirmpassword
        ) { } else {
            this.setState({
                ready: false
            })
        }
    }

    emailChange = (event) => {
        if(event.target.value.length < 33){
            this.setState({
                email: event.target.value
            })
        }
    }

    firstNameChange = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }

    lastNameChange = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }

    passwordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    confirmPasswordChange = (event) => {
        this.setState({
            confirmpassword: event.target.value
        })
    }

    componentDidUpdate() {
        if (this.state.ready === false) {
            console.log("confirming ready")
            this.checkIfReady()
        } else {
            console.log("confirming still ready")
            this.confirmStillReady()
        }
    }

    render() {
        let submissionerror;
        let submitbutton;
        let passworderror;

        //Check if submit button ready to be on
        if (this.state.ready) {
            submitbutton = <button type="submit" className="btn btn-primary" onClick={this.createNewUser}>Sign Up</button>
        } else {
            // submitbutton = <button type="submit" className="btn btn-primary disabled" onClick={this.createNewUser}>Sign Up</button>
            submitbutton = <button type="submit" className="btn btn-primary disabled">Sign Up</button>
        }

        //Check if passwords match
        if (this.state.password !== this.state.confirmpassword || this.state.password.length === 0) {
            passworderror = <p className="text-danger">Passwords do not match</p>
        } else {
            // passworderror = <p className="text-success">Passwords match</p>
            passworderror = undefined
        }

        //Check submission error
        if (this.state.submissionerror) {
            submissionerror = <p className="text-danger">{this.state.errormessage}</p>
        } else {
            submissionerror = undefined
        }

        return (
            <div className="card bg-dark sticky-top">
                <div className="card-body">
                    <div className="card-header bg-light">
                        <h5>Sign Up</h5>
                    </div>
                    <div className="card-body bg-white">
                        {passworderror}
                        {submissionerror}
                        <form onSubmit={(event) => event.preventDefault()}>
                            <div className="form-group"> 
                                <input type="text" className="form-control" value={this.state.email} placeholder="Username" name="email" onChange={this.emailChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.firstname} placeholder="First Name" name="firstname" onChange={this.firstNameChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.lastname} placeholder="Last Name" name="lastname" onChange={this.lastNameChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" value={this.state.password} placeholder="Password" name="password" onChange={this.passwordChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" value={this.state.confirmpassword} placeholder="Confirm Password" name="confirmpassword" onChange={this.confirmPasswordChange} />
                            </div>
                            {submitbutton}
                        </form>
                    </div>
                    <div className="card-footer bg-light">
                        <a className="text-primary" onClick={(event) => {
                            event.preventDefault()
                            this.props.signInToggle()
                        }}>Already Have An Account?</a>
                    </div>
                </div>
            </div>
        )
    }
}//End SignUp

export default SignUp;