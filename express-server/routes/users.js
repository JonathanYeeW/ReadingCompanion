var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/merntest')
mongoose.Promise = global.Promise;

// USER SCHEMA
var UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
})
mongoose.model('User', UserSchema);
var User = mongoose.model('User')

//BOOK SCHEMA
var BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  userid: String,
  allusers: [String],
  genre: String,
  description: String,
  reviews: []
})
mongoose.model('Book', BookSchema);
var Book = mongoose.model('Book')

//Get All Users
router.get('/', function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) {
      res.json({ message: 'error', error: err })
    } else {
      res.json({ message: 'Get All Users Successful', users: users })
    }
  })
});

// Get All Books
router.get('/books', function (req, res, next) {
  Book.find({}, function (err, books) {
    if (err) {
      res.json({ message: "There was an error trying to get all the books", error: err })
    } else {
      res.json({ message: "Success!", books: books })
    }
  })
})

//Sign In w/ Email and Password
router.post('/signin', function (req, res, next) {
  const email = req.body.email
  console.log("The email we're seaching for is", email)
  const password = req.body.password
  // NOTE: for whatever reason, it's important to const password
  // otherwise they won't match in the conditional below when comparing.
  User.find({ email: email }, function (err, user) {
    if (err) {
      console.log("error finding")
      res.json({ message: "There was an error finding the user", error: err, confirm: false })
    } else {
      if (user.length > 0) {
        if (user[0].password === password) {
          console.log("yes users")
          res.json({ message: "There is a user", confirm: true, id: user[0]["_id"] })
        } else {
          console.log("No users 1")
          res.json({ message: "There is a user", confirm: false })
        }
      } else {
        console.log("No users 2")
        res.json({ message: "There is not a user", confirm: false })
      }
    }
  })
})

//Get User By Id
router.post('/getuserinfo', function (req, res, next) {
  User.find({ _id: req.body.id }, function (err, user) {
    if (err) {
      res.json({ message: "There was an error finding the suer", error: err })
    } else {
      res.json({ firstname: user[0].firstname, lastname: user[0].lastname, message: "Successfully got the user info" })
    }
  })
})

//Get Books By userid
router.post('/getuserbooks', function (req, res, next) {
  Book.find({ allusers: req.body.userid }, function (err, books) {
    if (err) {
      res.json({ message: "There was an error getting books by userid", error: err })
    } else {
      res.json({ message: "Successfully got all the books for this user", books: books })
    }
  })
})

//Create New User
router.post('/create', function (req, res, next) {
  var user = new User({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password })
  user.save(function (err) {
    if (err) {
      res.json({ message: "error creating new user", error: true })
    } else {
      res.json({ message: "Create New User Successful", newUser: user, error: false })
    }
  })
})

//Create New Book
router.post('/createBook', function (req, res, next) {
  var book = new Book({ title: req.body.title, author: req.body.author, userid: req.body.userid, allusers: [req.body.userid] })
  book.save(function (err) {
    if (err) {
      res.json({ message: "Error creating a new book", error: err })
    } else {
      res.json({ message: "Successfully created a new book", book: book })
    }
  })
})
// Author.update({_id: id}, {firstName: request.body.firstName, lastName:request.body.lastName}, function(err){
//Add Book
router.post('/addBook', function (req, res) {
  let userid = req.body.userid
  console.log("going to find this book by id", req.body.id)
  Book.find({ _id: req.body.id }, function (err, theBook) {
    if (err) {
      console.log(err)
      res.json({ message: "there was an error finding the book for /addBook" })
    } else {
      console.log("The book i want is", theBook)
      let temp = theBook[0].allusers
      console.log("######################")
      console.log(temp)
      temp.push(userid)
      console.log(temp)
      console.log("The Book id is", theBook[0]._id)
      // res.json({ message: "we good?" })
      Book.update({ _id: theBook[0]._id }, { allusers: temp }, function (err) {
        if (err) {
          res.json({ message: "There was an error adding the book to the user", error: err })
        } else {
          res.json({ message: "Successfully added the book to the user" })
        }
      })
    }
  })
})

//Discover Book
router.post('/discoverBook', function (req, res) {
  const temp = req.body.id
  Book.find({ allusers: { $ne: temp } }, function (err, books) {
    if (err) {
      res.json({ message: "There was an error Discovering New Books", error: err })
    } else {
      const newBook = books[Math.floor(Math.random() * books.length)]
      res.json({ message: "Discover New Book Success", newBook: newBook })
    }
  })
})

//Delete All Users
router.get('/deleteAll', function (req, res, next) {
  User.remove({}, function (err) {
    if (err) {
      res.json({ message: "error", error: err })
    } else {
      res.json({ message: "Delete All Users Successful" })
    }
  })
})

//Delete All Books
router.get('/deleteAllBooks', function (req, res) {
  Book.remove({}, function (err) {
    if (err) {
      res.json({ message: "There was an error deleting all the books" })
    } else {
      res.json({ message: "deleting all the books successful" })
    }
  })
})

//Delete Book By id
router.post('/deleteBook', function (req, res) {
  console.log(req.body)
  Book.remove({ _id: req.body.id }, function (err) {
    if (err) {
      res.json({ message: "There was an error deleting the book by id", error: err })
    } else {
      res.json({ message: "Successfully deleted the book by id" })
    }
  })
})

//Remove Book by id
router.post('/removeBook', function (req, res) {
  console.log(req.body)

  Book.find({ _id: req.body.id }, function (err, theBook) {
    if (err) {
      res.json({ message: "couldnt' find the book", error: err })
    } else {
      let temp = theBook[0].allusers
      let newArray = []
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] != req.body.userid) {
          newArray.push(temp[i])
        }
      }
      Book.update({ _id: theBook[0]._id }, { allusers: newArray}, function(err){
        if(err){
          res.json({message:"There was an error updating the book", error: err})
        } else {
          res.json({message:"Successfully removed the user"})
        }
      })


    }
  })

  // Book.find({ _id: req.body.id }, function (err, theBook) {

  //     Book.update({ _id: theBook[0]._id }, { allusers: temp }, function (err) {
  //       if (err) {
  //         res.json({ message: "There was an error adding the book to the user", error: err })
  //       } else {
  //         res.json({ message: "Successfully added the book to the user" })
  //       }
  //     })
  //   }
  // })



  // Book.remove({ _id: req.body.id }, function (err) {
  //   if (err) {
  //     res.json({ message: "There was an error deleting the book by id", error: err })
  //   } else {
  //     res.json({ message: "Successfully deleted the book by id" })
  //   }
  // })
})

module.exports = router;

// router.post('/test', function(req, res, next){
//   console.log("## server.js ## TEST")
//   console.log("######################################################################")
//   console.log("######################################################################")
//   console.log("######################################################################")
//   console.log("######################################################################")
//   console.log(req.body)
//   res.json({message: "test su??ccess"})
// })

// //Get All Authors
// app.get('/authors', function(request, response){
//   console.log("## server.js ## GET ALL AUTHORS ##")
//   Author.find({}, function(err, authors){
//       if(err){
//           console.log("There was an error", err)
//           response.json({message: 'error', error: err})
//       } else {
//           console.log("Success")
//           response.json({message: 'Get All Authors Successful', authors: authors})
//       }
//   })
// });

// //Get Single Author By ID

// app.get('/authors/:id', function(request, response){
//   console.log("## server.js ## GET SINGLE AUTHOR BY ID ##")
//   console.log("passedID is",request.params.id)
//   let id = request.params.id
//   Author.find({_id: id}, function(err, author){
//       if(err){
//           console.log("There was an error", err)
//           response.json({message: "Error", error: err})
//       } else {
//           console.log("Success")
//           response.json({message: "Get Single Author Successful", author: author})
//       }
//   })
// })

// //Creat New Author

// app.post('/authors', function(request, response){
//   console.log("## server.js ## CREATE NEW AUTHOR ##")
//   var author = new Author({firstName: request.body.firstName, lastName: request.body.lastName})
//   author.save(function(err){
//       if(err){
//           console.log("There was an error", err)
//           response.json({message: "errer", error: err})
//       } else {
//           console.log("Success")
//           response.json({message: "Create New Author Successful", newAuthor: author})
//       }
//   })
// })

// //Update Single Author By ID

// app.put('/authors/:id', function(request, response){
//   console.log("## server.js ## UPDATE SINGLE AUTHOR BY ID ##")
//   console.log("passedID is", request.params.id)
//   let id = request.params.id
  // Author.update({_id: id}, {firstName: request.body.firstName, lastName:request.body.lastName}, function(err){
//       if(err){
//           console.log("There was an error", err)
//           response.json({message: "error", error: err})
//       } else {
//           console.log("Success")
//           response.json({message: "Update Single Author Successful"})
//       }
//   })
// })

// //Delete Single Author by ID

// app.delete('/authors/:id', function(request, response){
//   console.log("## server.js ## DELETE SINGLE AUTHOR BY ID ##")
//   console.log("passedID is", request.params.id)
//   let id = request.params.id
//   Author.remove({_id: id}, function(err){
//       if(err){
//           console.log("There was an error", err)
//           response.json({message: "error", error: err})
//       } else {
//           console.log("Success")
//           response.json({message: "Delete Single Author Successful"})
//       }
//   })
// })

// //Delete All Authors

// app.delete('/deleteAll', function(request, response){
//   console.log("## server.js ## DELETE ALL AUTHORS ##")
//   Author.remove({}, function(err){
//       if(err){
//           console.log("There was an error", err)
//           response.json({message: "error", error: err})
//       } else {
//           console.log("Success")
//           response.json({message: "Delete All Authors Successful"})
//       }
//   })
// })