var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User')

//Get All Users
router.get('/', function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) {
      res.json({ message: 'error', error: true })
    } else {
      res.json({ message: 'Get All Users Successful', error: false, users: users })
    }
  })
});

//Sign In w/ Email and Password
router.post('/signin', function (req, res, next) {
  const email = req.body.email
  const password = req.body.password
  
  // NOTE: for whatever reason, it's important to const password
  // otherwise they won't match in the conditional below when comparing.
  User.find({ email: email }, function (err, user) {
    if (err) {
      res.json({ message: "There was an error finding the user", error: true, confirm: false })
    } else {
      if (user.length > 0) {
        if (user[0].password === password) {
          res.json({ message: "There is a user", confirm: true, id: user[0]["_id"] })
        } else {
          res.json({ message: "There is a user", confirm: false })
        }
      } else {
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
router.post('/checkUserExists', function (request, response) {
  response.json({ message: "User Does not exist", error: false })
})

// CREATE NEW USER
router.post('/create', function (req, res, next) {
  // Using the email, look for if the user exists
  console.log("## users.js ## /create")
  console.log("Looking for user with email", req.body.email)
  User.find({ email: req.body.email }, function (err, user) {
    if (err) {
      res.json({ message: "Error Searching For User", error: true })
    } else {
      // console.log(user.length)
      if (user.length == 0) {
        // Create User
        var user = new User({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password, created_at: Date(), updated_at: Date() })
        user.save(function (err) {
          if (err) {
            res.json({ message: "Please Fill In All Required Fields", error: true })
          } else {
            res.json({ message: "Create New User Successful", newUser: user, error: false })
          }
        })
      } else {
        // User Already Exists
        res.json({ message: "Username Already In Use", error: true })
      }
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

router.post('/count', function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.json({ message: 'error', error: err })
    } else {
      res.json({ message: "success", error: false, count: users.length })
    }
  })
})

module.exports = router;