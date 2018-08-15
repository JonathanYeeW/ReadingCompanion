var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User')

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

// CHECK IF USER EXISTS
router.post('/checkUserExists', function(request, response){
  response.json({message: "User Does not exist", error: false})
})



// CREATE NEW USER
router.post('/create', function (req, res, next) {
  var user = new User({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password, created_at: Date(), updated_at: Date() })
  user.save(function (err) {
    if (err) {
      res.json({ message: "error creating new user", error: true })
    } else {
      res.json({ message: "Create New User Successful", newUser: user, error: false })
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

//DELETE USER BY ID
router.post('/delete', function (request, response, next) {
  console.log("delete the user", request.body)
  User.remove({ _id: request.body.userid }, function (err) {
    if (err) {
      response.json({ message: "There was an error deleting user by id", error: true })
    } else {
      response.json({ message: "success", error: false })
    }
  })
})

module.exports = router;