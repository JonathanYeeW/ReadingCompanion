console.log("index.js")
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/merntest')
mongoose.Promise = global.Promise;

// USER SCHEMA
var UserSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  created_at: {type: Date, required: true},
  updated_at: {type: Date, required: true},
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

//REVIEW SCHEMA
var ReviewSchema = new mongoose.Schema({
  title: String,
  userid: String,
  username: String,
  post: String,
  created_at: Date,
  updated_at: Date,
})
mongoose.model('Review', ReviewSchema)

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
  console.log("## index ## /")
  res.render('index', { title: 'Express' });
});

module.exports = router;
