// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';
// var userManager = require('../controllers/userManager')

export class Login extends Component {
    constructor(props) {
        super(props);
        console.log("## Login ## props:", this.props)
    }

    state = {
        signIn: true,
    }

    signInToggle = () => {
        this.setState({
            signIn: !this.state.signIn
        })
    }

    render() {
        let body;
        if (this.state.signIn === true) {
            body = <SignIn
                login={this.props.login}
                signInToggle={this.signInToggle}
            />
        } else {
            body = <SignUp
                login={this.props.login}
                signInToggle={this.signInToggle}
            />
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
                    <div className="col-6 d-flex justify-content-start">
                        <a className="navbar-brand" href="#">Reading Companion</a>
                    </div>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                                {body}
                        </div>
                        <div className="col-8">
                            <div className="row d-flex justify-content-center">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/kW9-vuLf3-w" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <h4>What Is Reading Companion?</h4>
                                <p>Reading Companion is a social network for users who want to share their favorite books, discover new books, and celebrate their love for reading</p>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <h4>Why Did I Make Reading Companion?</h4>
                                <p>Reading Companion was thought of between two friends trying to figure out how best to learn about someone over social media. With pictures, you have a really strong grasp of your image.
                                    But with books, the types of books that you read and own reflect a lot more about your character than you can convey in words even.
                                </p>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <h4>How Can Reading Companion Connect People</h4>
                                <p>By understanding what other people read and why they read it, you can discover new books and relate to people on a deeper level than you
                                    would typically over other social networks.
                                </p>



                                <p>By understanding what other people read and why they read it, you can discover new books and relate to people on a deeper level than you
                                    would typically over other social networks.
                                </p>
                                <p>By understanding what other people read and why they read it, you can discover new books and relate to people on a deeper level than you
                                    would typically over other social networks.
                                </p>
                                <p>By understanding what other people read and why they read it, you can discover new books and relate to people on a deeper level than you
                                    would typically over other social networks.
                                </p>
                                <p>By understanding what other people read and why they read it, you can discover new books and relate to people on a deeper level than you
                                    would typically over other social networks.
                                </p>
                                <p>By understanding what other people read and why they read it, you can discover new books and relate to people on a deeper level than you
                                    would typically over other social networks.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}//End Login

export default Login;

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
        if (this.state.email !== "" && this.state.password !== "") {
            console.log("Passes validateInputs")
            return true
        } else {
            console.log("Does not pass validateInputs")
            this.setState({
                confirm: false
            })
            return false
        }
    }

    checkForUser = (event) => {
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
        console.log("Create User")
        const body = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
        }
        // let temp = await console.log(userManager.createNewUser(body))
        fetch('/users/create', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
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

    isEmail = () => {
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
        this.setState({
            email: event.target.value
        })
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
            this.checkIfReady()
        } else {
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