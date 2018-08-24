
function checkForExistingUser(emailAddress) {
    console.log("## userManager ## checkForExistingUser()")
}

function fetchUserData(userid) {
    console.log("## userManager ## fetchUserData")
    return new Promise((resolve, reject) => {
        const temp = { id: userid }
        fetch('/users/getuserinfo', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(temp)
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function getAllUsers() {
    console.log("## userManager ## getAllUsers()")
    return new Promise((resolve, reject) => {
        fetch('/users/')
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function createNewUser(data) {
    // data: complete object with all neccessary user properties
    console.log("## userManager ## createNewUser()")
    return new Promise((resolve, reject) => {
        fetch('/users/create', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function userCounter() {
    console.log("## userManager ## userCounter()")
    return new Promise((resolve, reject) => {
        fetch('/users/count', {
            method: "POST"
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                resolve(res)
            })
    })
}

function deleteAllUsers() {
    console.log("## userManager ## deleteAllUsers()")
    return new Promise((resolve, reject) => {
        fetch('/users/deleteAll')
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function deleteUser(data) {
    // data = { userid : String }
    console.log("## userManager ## deleteUser()")
    return new Promise((resolve, reject) => {
        fetch('/users/delete', {
            method: "DELETE",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

module.exports = {
    checkForExistingUser,
    getAllUsers,
    createNewUser,
    fetchUserData,
    userCounter,
    deleteAllUsers,
    deleteUser
}