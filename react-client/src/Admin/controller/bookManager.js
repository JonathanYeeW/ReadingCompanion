const dummyData = require('../../dummyData')
// const validationManager = require('./validationManager')

let counter = 0

function getAllBooks() {
    console.log("## bookManager ## getAllBooks()")
    return new Promise((resolve, reject) => {
        fetch('/books/')
            .then(res => res.json())
            .then(res => {
                resolve(res)
            })
    })
}

function getAllUserBooks(userid) {
    console.log("## bookManager ## getAllUserBooks()")
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

function getBooksByTitle(booktitle) {
    // booktitle = String
    console.log("## bookManager ## getBooksByTitle()")
    return new Promise((resolve, reject) => {
        fetch('/books/booktitle', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ title: booktitle })
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function getBooksByAuthor(authorName) {
    console.log("## bookManager ## getBooksByAuthor()")
    return new Promise((resolve, reject) => {
        fetch('/books/authorname', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name: authorName })
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
    // data = { title: String, author: String, userid: String, isbn10: String, isbn13: String }
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
        fetch('/books/deleteAll', {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function deleteBook(data) {
    // data = { bookid : String }
    console.log("## bookManager ## deleteBook()")
    return new Promise((resolve, reject) => {
        fetch('/books/delete', {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
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

function likeBook(data) {
    // data = { bookid: String, newLikes: Number }
    console.log("## bookManager ## likeBook()")
    return new Promise((resolve, reject) => {
        fetch('/books/like', {
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

// MARK: Function below is for development purposes
// Use it to repopulate the Book Objects

function populateDevelopmentBooks() {
    console.log("## bookManager ## populateDevelopmentBooks() ##")
    // Create Dummy Products
    for (let i = 0; i < dummyData.Books.length; i++) {
        counter++
        let data =
        {
            title: dummyData.Books[i].title,
            author: dummyData.Books[i].author,
            isbn10: dummyData.Books[i].isbn10,
            isbn13: dummyData.Books[i].isbn13,
            rcid: counter
        }
        createBook(data)
    }
}


module.exports = {
    getAllBooks,
    getAllUserBooks,
    removeBookFromUser,
    createBook,
    discoverBook,
    addBook,
    deleteAllBooks,
    bookCounter,
    deleteBook,
    getBooksByTitle,
    getBooksByAuthor,
    likeBook,
    populateDevelopmentBooks,
}

