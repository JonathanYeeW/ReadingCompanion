var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = mongoose.model('Book')

// MARK: This books.js is where all the Books routes need to be 
// transitioned too. After confirming that they all work i need 
// to go through the front end and rewrite all of the routes so 
// that they call the correct routes and i can remove the old ones 
// from the users.js file. This way all the routes are better 
// organized.

// MARK: So far I've transitioned all of the created routes on 
// the user.js file that have to do with books to this file. Most 
// are commented out though.


/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({ message: "/books/" })
});

// Get All Books
router.get('/allBooks', function (req, res, next) {
    Book.find({}, function (err, books) {
        if (err) {
            res.json({ message: "There was an error trying to get all the books", error: err })
        } else {
            res.json({ message: "Success!", books: books })
        }
    })
})

//Get Books By userid
// router.post('/getuserbooks', function (req, res, next) {
//     Book.find({ allusers: req.body.userid }, function (err, books) {
//         if (err) {
//             res.json({ message: "There was an error getting books by userid", error: err })
//         } else {
//             res.json({ message: "Successfully got all the books for this user", books: books })
//         }
//     })
// })

//Create New Book
// router.post('/createBook', function (req, res, next) {
//     var book = new Book({ title: req.body.title, author: req.body.author, userid: req.body.userid, allusers: [req.body.userid] })
//     book.save(function (err) {
//         if (err) {
//             res.json({ message: "Error creating a new book", error: err })
//         } else {
//             res.json({ message: "Successfully created a new book", book: book })
//         }
//     })
// })

//Add Book
// router.post('/addBook', function (req, res) {
//     let userid = req.body.userid
//     console.log("going to find this book by id", req.body.id)
//     Book.find({ _id: req.body.id }, function (err, theBook) {
//       if (err) {
//         console.log(err)
//         res.json({ message: "there was an error finding the book for /addBook" })
//       } else {
//         console.log("The book i want is", theBook)
//         let temp = theBook[0].allusers
//         console.log("######################")
//         console.log(temp)
//         temp.push(userid)
//         console.log(temp)
//         console.log("The Book id is", theBook[0]._id)
//         // res.json({ message: "we good?" })
//         Book.update({ _id: theBook[0]._id }, { allusers: temp }, function (err) {
//           if (err) {
//             res.json({ message: "There was an error adding the book to the user", error: err })
//           } else {
//             res.json({ message: "Successfully added the book to the user" })
//           }
//         })
//       }
//     })
//   })

//Discover Book
// router.post('/discoverBook', function (req, res) {
//     const temp = req.body.id
//     Book.find({ allusers: { $ne: temp } }, function (err, books) {
//         if (err) {
//             res.json({ message: "There was an error Discovering New Books", error: err })
//         } else {
//             const newBook = books[Math.floor(Math.random() * books.length)]
//             res.json({ message: "Discover New Book Success", newBook: newBook })
//         }
//     })
// })

// //Delete All Books
// router.get('/deleteAllBooks', function (req, res) {
//     Book.remove({}, function (err) {
//         if (err) {
//             res.json({ message: "There was an error deleting all the books" })
//         } else {
//             res.json({ message: "deleting all the books successful" })
//         }
//     })
// })

// //Delete Book By id
// router.post('/deleteBook', function (req, res) {
//     console.log(req.body)
//     Book.remove({ _id: req.body.id }, function (err) {
//         if (err) {
//             res.json({ message: "There was an error deleting the book by id", error: err })
//         } else {
//             res.json({ message: "Successfully deleted the book by id" })
//         }
//     })
// })

// //Remove Book by id
// router.post('/removeBook', function (req, res) {
//     console.log(req.body)

//     Book.find({ _id: req.body.id }, function (err, theBook) {
//         if (err) {
//             res.json({ message: "couldnt' find the book", error: err })
//         } else {
//             let temp = theBook[0].allusers
//             let newArray = []
//             for (let i = 0; i < temp.length; i++) {
//                 if (temp[i] != req.body.userid) {
//                     newArray.push(temp[i])
//                 }
//             }
//             Book.update({ _id: theBook[0]._id }, { allusers: newArray }, function (err) {
//                 if (err) {
//                     res.json({ message: "There was an error updating the book", error: err })
//                 } else {
//                     res.json({ message: "Successfully removed the user" })
//                 }
//             })


//         }
//     })
// })


module.exports = router;
