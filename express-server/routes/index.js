console.log("index.js")
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

//POST SCHEMA
var PostSchema = new mongoose.Schema({
  title: String,
  userid: String,
  post: String,
  created_At: Date,
})
mongoose.model('Post', PostSchema)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
