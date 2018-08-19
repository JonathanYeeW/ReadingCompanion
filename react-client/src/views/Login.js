// MARK: All Componenets are rendered through the App.js
// Look there when starting to learn this application

import React, { Component } from 'react';
import { SignIn } from './Components/Login/SignIn'
import { SignUp } from './Components/Login/SignUp'

// var userManager = require('../controllers/userManager')

// Props (from App.js)
// - navigationSwitch()

export class Login extends Component {
    constructor(props) {
        super(props);
        console.log("## Login ## props:", this.props)
        this.state = {
            signIn: true
        }
    }

    signInToggle = () => {
        console.log("## Login ## signInToggle()")
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
                    <div className="col-6 d-flex justify-content-end">
                        <button className="btn" onClick={() => this.props.navigationSwitch(0)}>Admin</button>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}//End Login

export default Login;