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
                        <h4>Things To Do</h4>
                        <ol>
                            <li>Edit Any String Property</li>
                            <li>Remove book from users library</li>
                            <li>Delete Book From Master Library</li>
                        </ol>
                    </div>
                </div>

                <div className="row">
                    <h3>Search Box</h3>
                </div>

                <div className="row">
                    <div className="col-12 dashboard-fill-width">
                        <form>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>title : String</label>
                                        <input type="text" name="title" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>author : String</label>
                                        <input type="text" name="author" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>genre : String</label>
                                        <input type="text" name="genre" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>isbn10 : String</label>
                                        <input type="text" name="isbn10" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>isbn13 : String</label>
                                        <input type="text" name="isbn13" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>description : String</label>
                                        <textarea className="form-control" rows="15"></textarea>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookWorkbench;
