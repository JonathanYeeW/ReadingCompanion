import React, { Component } from 'react';

export class Testnewsfeed extends Component {

    fetchAllNewsfeedObjects = () => {
        console.log("Fetch all newsfeed_objects")
        fetch('/newsfeed')
            .then(res => res.json())
            .then(res => console.log(res))
    }

    createNewsfeedObject = () => {
        const data = {
            title: "title1",
            by_userid: "user_id1",
            by_username: "username1",
            type: "type1",
            type_id: "type_id1",
            type_title: "type_title1",
        }
        fetch('/newsfeed/create', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }

    deleteAllNewsfeedObjects = () => {
        console.log("deleteAllNewsfeedObjects")
        fetch('/newsfeed/deleteAll', {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }

    // fetchUserData = () => {
    //     const temp = { id: this.props.userid }
    //     fetch('/users/getuserinfo', {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(temp)
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             this.setState({
    //                 firstname: res.firstname,
    //                 lastname: res.lastname,
    //             })
    //         })
    // }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button className="btn btn-info" onClick={() => this.fetchAllNewsfeedObjects()}> Get All Newsfeed Objects</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-success" onClick={() => this.createNewsfeedObject()}> Create New Newsfeed Object</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger" onClick={() => this.deleteAllNewsfeedObjects()}> Delete New Newsfeed Object</button>
                    </div>
                </div>

            </div>
        )
    }
}//End Login

export default Testnewsfeed;