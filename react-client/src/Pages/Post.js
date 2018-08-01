import React, { Component } from 'react';

export class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expansion: false
        }
    }

    expand = () => {
        this.setState({
            expansion: !this.state.expansion
        })
    }

    render() {
        let body;
        if (this.state.expansion) {
            body =
                <div>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6 d-flex justify-content-start">
                                <p>{this.props.post.title}</p>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <button className="btn btn-secondary" onClick={() => this.expand()}>Expand</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <p className="card-text text-muted">{this.props.post.username}</p>
                        <p className="card-text text-muted">{this.props.post.created_At}</p>
                        <p className="card-text">{this.props.post.post}</p>
                    </div>
                </div>
        } else {
            body =
                <div>
                <div className="card-header">
                        <div className="row">
                            <div className="col-6 d-flex justify-content-start">
                                <p>POST: {this.props.post.username}</p>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <button className="btn btn-outline-secondary" onClick={() => this.expand()}>Expand</button>
                            </div>
                        </div>
                    </div>
                </div>
        }
        return (
            <div className="card bg-info">
                {body}
            </div>
        )
    }
}

export default Post;