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
  created_at: Date,
  updated_at: Date,
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
  reviews: [],
  created_at: Date,
  updated_at: Date,
})
mongoose.model('Book', BookSchema);

//POST SCHEMA
var PostSchema = new mongoose.Schema({
  title: String,
  userid: String,
  username: String,
  post: String,
  created_at: Date,
  updated_at: Date,
})
mongoose.model('Post', PostSchema)

//NEWSFEED SCHEMA
var NewsfeedSchema = new mongoose.Schema({
  title: String,
  by_userid: String,
  by_username: String,
  type: String,
  type_id: String,
  type_title: String,
  created_at: Date,
  updated_at: Date,
})
mongoose.model('Newsfeed', NewsfeedSchema)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
