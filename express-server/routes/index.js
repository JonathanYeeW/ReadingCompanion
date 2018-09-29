console.log("index.js")
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/merntest1')
mongoose.Promise = global.Promise;

// USER SCHEMA
var UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  lastSignIn: { type: Date, required: true }
})
mongoose.model('User', UserSchema);

//BOOK SCHEMA
var BookSchema = new mongoose.Schema({
  rcid: String,
  title: String,
  author: String,
  genre: String,
  subgenre: String,
  fiction: Boolean,
  isbn10: String,
  isbn13: String,
  description: String,
  edition: Number,
  pages: Number,
  language: String,
  publisher: String,
  publishingDate: String,
  hardcover: Boolean,
  image: String,
  created_at: Date,
  updated_at: Date,
  
  userid: String,
  allusers: [String],
  reviews: [],
  likes: Number,
})
BookSchema.index({ title: "text", author: "text" })
mongoose.model('Book', BookSchema);

//REVIEW SCHEMA
var ReviewSchema = new mongoose.Schema({
  title: String,
  userid: String,
  username: String,
  review: String,
  flags: Number,
  likes: Number,
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
router.get('/', function (req, res, next) {
  console.log("## index ## /")
  res.render('index', { title: 'Express' });
});

module.exports = router;
