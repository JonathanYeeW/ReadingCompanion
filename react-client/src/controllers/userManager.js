
// checks for existing user before allowing registration
// of new user. Looks using inputted email address
function checkForExistingUser(emailAddress) {
    console.log("## userManager ## checkForExistingUser()")
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
    console.log("## userManager ## createNewUser()")
    console.log(data)
    let temp = false;
    fetch('/users/create', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        // .then(return() true)
        .then(res => res.json())
        .then(res => {
            temp = true
        });
    return temp
}

function asyncFunction() {
    return new Promise((resolve, reject) => {
        fetch('/users/')
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

module.exports = {
    checkForExistingUser,
    getAllUsers,
    createNewUser,
    asyncFunction
}