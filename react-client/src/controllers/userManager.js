
// checks for existing user before allowing registration
// of new user. Looks using inputted email address
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

// a function that gets all the users
function getAllUsers() {
    console.log("## userManager ## getAllUsers()")
    return new Promise((resolve, reject) => {
        fetch('/users/')
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

// function to create a new user. the data sent over
// is all the inputs for the new users properties
// async function createNewUser(data){
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

module.exports = {
    checkForExistingUser,
    getAllUsers,
    createNewUser,
    fetchUserData,
}