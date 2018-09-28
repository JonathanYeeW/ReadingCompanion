import React, { Component } from 'react';
import Header from './Header';

class Bookform extends Component {
    render() {
        return (
            <div>
                <Header />
                <div class="btn-toolbar pb-3" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group mr-2" role="group">
                        <button type="button" class="btn btn-secondary">Create</button>
                    </div>
                    <div class="btn-group mr-2" role="group">
                        <button type="button" class="btn btn-secondary">Read</button>
                    </div>
                    <div class="btn-group mr-2" role="group">
                        <button type="button" class="btn btn-secondary">Update</button>
                    </div>
                    <div class="btn-group mr-2" role="group">
                        <button type="button" class="btn btn-secondary">Delete</button>
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text" id="btnGroupAddon">RCID#</div>
                        </div>
                        <input type="text" class="form-control" />
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
            </div>
        )
    }
}

export default Bookform;
