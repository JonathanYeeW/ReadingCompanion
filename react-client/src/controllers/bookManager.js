
function getAllUserBooks(userid) {
    console.log("## bookManager ## getAllBooks()")
    return new Promise((resolve, reject) => {
        fetch('/books/usercollection', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ userid: userid })
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function removeBookFromUser(bookid, userid) {
    console.log("## bookManager ## removeBookFromUser()")
    return new Promise((resolve, reject) => {
        fetch('/books/remove', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ id: bookid, userid: userid })
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function createBook(data) {
    console.log("## bookManager ## createBook()")
    return new Promise((resolve, reject) => {
        fetch('/books/create', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => { resolve(res) })
    })
}

function discoverBook(userid) {
    console.log("## bookManager ## discoverBook()")
    return new Promise((resolve, reject) => {
        fetch('/books/discover', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ id: userid })
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function addBook(data) {
    // let data = { id: this.state.newBook._id, userid: this.props.userid }
    console.log("## bookManager ## addBook()")
    return new Promise((resolve, reject) => {
        fetch('/books/add', {
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

function deleteAllBooks() {
    console.log("## bookManager ## deleteAllBooks()")
    return new Promise((resolve, reject) => {
        fetch('/books/deleteAll')
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function bookCounter() {
    console.log("## bookManager ## bookCounter()")
    return new Promise((resolve, reject) => {
        fetch('/books/count', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

module.exports = {
    getAllUserBooks,
    removeBookFromUser,
    createBook,
    discoverBook,
    addBook,
    deleteAllBooks,
    bookCounter,
}