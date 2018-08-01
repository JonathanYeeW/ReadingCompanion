
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post')

// GET ALL POSTS
router.get('/', function (request, response) {
    Post.find({}, function (err, posts) {
        if (err) {
            response.json({ message: "There was an error getting all posts", error: true })
        } else {
            response.json({ message: "success", error: false, posts: posts })
        }
    })
})

// CREATE POST
router.post('/create', function (request, response) {
    var post = new Post({ title: request.body.title, userid: request.body.userid, post: request.body.post, created_At: Date() })
    post.save(function (err) {
        if (err) {
            response.json({ message: "There was an error creating a new post", error: true })
        } else {
            response.json({ message: "success", error: false, newPost: post })
        }
    })
})

// DELETE ALL POSTS
router.delete('/deleteAll', function (request, response) {
    Post.remove({}, function (err) {
        if (err) {
            response.json({ message: "There was an error deleting all posts", error: true })
        } else {
            response.json({ message: "success", error: false })
        }
    })
})

module.exports = router;