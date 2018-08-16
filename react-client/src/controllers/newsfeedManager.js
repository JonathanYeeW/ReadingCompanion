
function fetchAllNewsfeedObjects() {
    console.log("## newsfeedManager ## fetchAllNewsfeedObjects()")
    return new Promise((resolve, reject) => {
        fetch('/newsfeed')
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function createNewsfeedObject(data) {
    //     const typedict = { 0: "Post", 1: "User", 2: "Book" }
    //     const data = {
    //         title: "title1",
    //         by_userid: "user_id1",
    //         by_username: "username1",
    //         type: typedict[Math.floor(Math.random() * 3)],
    //         type_id: "type_id1",
    //         type_title: "type_title1",
    //     }
    console.log("## newsfeedManager ## createNewsfeedObject()")
    return new Promise((resolve, reject) => {
        fetch('/newsfeed/create', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function deleteAllNewsfeedObjects() {
    console.log("## newsfeedManager ## deleteAllNewsfeedObjects()")
    return new Promise((resolve, reject) => {
        fetch('/newsfeed/deleteAll', {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

module.exports = {
    fetchAllNewsfeedObjects,
    createNewsfeedObject,
    deleteAllNewsfeedObjects,
}