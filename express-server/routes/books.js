var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = mongoose.model('Book')
var Newsfeed = mongoose.model('Newsfeed')


// MARK: This books.js is where all the Books routes need to be 
// transitioned too. After confirming that they all work i need 
// to go through the front end and rewrite all of the routes so 
// that they call the correct routes and i can remove the old ones 
// from the users.js file. This way all the routes are better 
// organized.

// MARK: So far I've transitioned all of the created routes on 
// the user.js file that have to do with books to this file. Most 
// are commented out though.

//GET ALL BOOKS
router.get('/', function (request, response) {
    Book.find({}, function (err, books) {
        if (err) {
            response.json({ message: "There was an error getting all books", error: true })
        } else {
            response.json({ message: "success", error: false, books: books })
        }
    })
})

//GET All BOOKS FOR USER BY ID
router.post('/usercollection', function (request, response) {
    Book.find({ allusers: request.body.userid }, function (err, books) {
        if (err) {
            response.json({ message: "There was an error getting all books for user by id", error: true })
        } else {
            response.json({ message: "success", error: false, books: books })
        }
    })
})

//CREATE BOOK
router.post('/create', function (request, response) {
    var book = new Book({ title: request.body.title, author: request.body.author, userid: request.body.userid, allusers: [request.body.userid], created_at: Date(), updated_at: Date() })
    book.save(function (err) {
        if (err) {
            response.json({ message: "There was an error creating a new book", error: true })
        } else {
            // CREATE A NEWSFEED OBJECT
            var newsfeed_object = new Newsfeed({
                title: book.title,
                by_userid: request.body.userid,
                by_username: request.body.username,
                type: "Book",
                type_id: book._id,
                type_title: book.title,
                created_at: Date(),
                updated_at: Date(),
            })
            newsfeed_object.save(function (err) {
                if (err) {
                    response.json({ message: "success CreateBook, Error Create NewsfeedObject", error: true })
                } else {
                    response.json({ message: "success Create Book, Create NewsfeedObject", error: false })
                }
            })
        }
    })
})

//USER ADD BOOK TO COLLECTION
router.post('/add', function (req, res) {
    let userid = req.body.userid
    Book.find({ _id: req.body.id }, function (err, theBook) {
        if (err) {
            res.json({ message: "There was an error finding the user for adding book to user collection", error: true })
        } else {
            let temp = theBook[0].allusers
            temp.push(userid)
            Book.update({ _id: theBook[0]._id }, { allusers: temp }, function (err) {
                if (err) {
                    res.json({ message: "There was an error adding book to user collection", error: true })
                } else {
                    res.json({ message: "success", error: false })
                }
            })
        }
    })
})

//USER REMOVE BOOK FROM COLLECTION
router.post('/remove', function (req, res) {
    Book.find({ _id: req.body.id }, function (err, theBook) {
        if (err) {
            res.json({ message: "There was an error finding the user for removing book from user collection", error: true })
        } else {
            console.log("The book to remove is ", theBook)
            console.log("The userid is", req.body.userid)
            let temp = theBook[0].allusers
            let newArray = []
            for (let i = 0; i < temp.length; i++) {
                if (temp[i] != req.body.userid) {
                    newArray.push(temp[i])
                } else {
                    console.log("Removed the userid", req.body.userid)
                }
            }
            Book.update({ _id: theBook[0]._id }, { allusers: newArray }, function (err) {
                if (err) {
                    res.json({ message: "There was an error removing book from user collection", error: true })
                } else {
                    res.json({ message: "success", error: false })
                }
            })
        }
    })
})

//DELETE ALL BOOKS
router.get('/deleteAll', function (req, res) {
    Book.remove({}, function (err) {
        if (err) {
            res.json({ message: "There was an error deleting all the books", error: true })
        } else {
            res.json({ message: "success", error: false })
        }
    })
})

//DELETE BOOK BY BOOK ID
router.post('/delete', function (req, res) {
    Book.remove({ _id: req.body.id }, function (err) {
        if (err) {
            res.json({ message: "There was an error deleting book by book id", error: true })
        } else {
            res.json({ message: "success", error: false })
        }
    })
})

//GET ALL BOOKS THAT ARE NOT IN COLLECTION, DISCOVER BOOKS
// Will return a single random book
router.post('/discover', function (req, res) {
    const temp = req.body.id
    Book.find({ allusers: { $ne: temp } }, function (err, books) {
        if (err) {
            res.json({ message: "There was an error discovering new books", error: true })
        } else {
            const newBook = books[Math.floor(Math.random() * books.length)]
            console.log("sending over this book", newBook)
            res.json({ message: "success", error: false, newBook: newBook })
        }
    })
})

module.exports = router;
