
// checks for existing user before allowing registration
// of new user. Looks using inputted email address
function checkForExistingUser(emailAddress) {
    console.log("## userManager ## checkForExistingUser()")
}

// a function that gets all the users
function getAllUsers() {
    console.log("## userManager ## getAllUsers()")
    fetch('/users/')
        .then(res => res.json())
        .then(res => console.log(res))
}

// function to create a new user. the data sent over
// is all the inputs for the new users properties
function createNewUser(data){
    console.log("## userManager ## createNewUser()")
    console.log(data)
    fetch('/users/create', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            if (res.error === false) {
                console.log("## userManager ## createNewUser() Success")
                return {newUserId: res.newUser._id, error: false}
            } else {
                console.log("## userManager ## createNewUser() Error")
                return {error: true}
            }
        });
}

module.exports = {
    checkForExistingUser,
    getAllUsers,
    createNewUser,
}