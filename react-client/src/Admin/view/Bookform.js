import React, { Component } from 'react';
import Header from './Header';
import List from './List';
const bookManager = require('../controller/bookManager')

class Bookform extends Component {
    constructor(props){
        super(props);
        console.log("## Bookform.js ## props:", props)
    }
    
    render() {
        return (
            <div>
                <Header />
                <div className="btn-toolbar pb-3" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group mr-2" role="group">
                        <button type="button" className="btn btn-secondary">Create</button>
                    </div>
                    <div className="btn-group mr-2" role="group">
                        <button type="button" className="btn btn-secondary">Read</button>
                    </div>
                    <div className="btn-group mr-2" role="group">
                        <button type="button" className="btn btn-secondary">Update</button>
                    </div>
                    <div className="btn-group mr-2" role="group">
                        <button type="button" className="btn btn-secondary">Delete</button>
                    </div>
                </div>

                <div className="row pb-3">
                    <div className="col-4">
                        <form className="form" onSubmit={(event) => event.preventDefault()}>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text" id="btnGroupAddon">RCID#</div>
                                </div>
                                <input type="text" className="form-control" />
                                <button className="btn btn-secondary ml-2">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

                <h3>Book Form</h3>
                <form>
                    <div className="row">
                        <div className="col-3">
                            <div className="form-group">
                                <label>Title:</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Author:</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Genre:</label>
                                <input type="email" className="form-control" />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label>Subgenre:</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Fiction</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>ISBN10:</label>
                                <input type="email" className="form-control" />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label>ISBN13:</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Edition:</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Hardcover:</label>
                                <input type="email" className="form-control" />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label>Language:</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Publisher:</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Published Date:</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Image:</label>
                                <input type="email" className="form-control" />
                            </div>
                        </div>
                    </div>
                </form>
                <List />
            </div>
        )
    }
}

export default Bookform;
