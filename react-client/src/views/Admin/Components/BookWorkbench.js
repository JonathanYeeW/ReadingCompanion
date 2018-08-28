import React, { Component } from 'react';

class BookWorkbench extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h4>Schema Info</h4>
                        <ul>
                            <li>title: String</li>
                            <li>author: String</li>
                            <li>userid: String</li>
                            <li>allusers: [String]</li>
                            <li>genre: String</li>
                            <li>description: String</li>
                            <li>isbn10: String</li>
                            <li>isbn13: String</li>
                            <li>reviews: []</li>
                            <li>likes: Number</li>
                            <li>created_at: Date</li>
                            <li>updated_at: Date</li>
                        </ul>
                    </div>
                    <div className="col-6">

                    </div>
                </div>

                <div className="row">
                    <h3>Search Box</h3>
                </div>

                <div className="row">
                    <form>
                        <div className="row">
                            <div className="col-3">
                                <div className="form-group">
                                    <label>title</label>
                                    <input type="text" name="title" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>author</label>
                                    <input type="text" name="author" className="form-control" />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group">
                                    <label>userid</label>
                                    <input type="text" name="userid" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>genre</label>
                                    <input type="text" name="genre" className="form-control" />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group">
                                    <label>description</label>
                                    <input type="text" name="description" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>isbn10</label>
                                    <input type="text" name="isbn10" className="form-control" />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group">
                                    <label>isbn13</label>
                                    <input type="text" name="isbn13" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>likes</label>
                                    <input type="text" name="likes" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>

            </div>
        )
    }
}

export default BookWorkbench;
