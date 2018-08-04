var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Newsfeed = mongoose.model('Newsfeed')

// GET ALL NEWSFEED OBJECTS
router.get('/', function (request, response) {
    Newsfeed.find({}, function (err, newsfeed_objects) {
        if (err) {
            response.json({ message: "There was an error getting all newsfeed_objects", error: true })
        } else {
            // Reverse the array so they're in new -> old order
            newsfeed_objects.reverse()
            response.json({ message: "success", error: false, newsfeed_objects: newsfeed_objects })
        }
    })
})

// CREATE NEWSFEED OBJECT
router.post('/create', function (request, response) {
    var newsfeed_object = new Newsfeed({ 
        title: request.body.title,
        by_userid: request.body.by_userid,
        by_username: request.body.by_username,
        type: request.body.type,
        type_id: request.body.type_id,
        type_title: request.body.type_title,
        created_at: Date(),
        updated_at: Date(),
    })
    newsfeed_object.save(function(err){
        if(err){
            response.json({message: "There was an error creating a new newsfeed_object", error: true})
        } else {
            response.json({message: "success", error: false})
        }
    })
})

// DELETE ALL NEWSFEED OBJECTS
router.delete('/deleteAll', function(request, response){
    Newsfeed.remove({}, function(err){
        if(err){
            response.json({message: "There was an error deleting all newsfeed_objects", error: true})
        } else {
            response.json({message: "success", error: false})
        }
    })   
})

// // DELETE ALL POSTS
// router.delete('/deleteAll', function (request, response) {
//     Post.remove({}, function (err) {
//         if (err) {
//             response.json({ message: "There was an error deleting all posts", error: true })
//         } else {
//             response.json({ message: "success", error: false })
//         }
//     })
// })

module.exports = router;