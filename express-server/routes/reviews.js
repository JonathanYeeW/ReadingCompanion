var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review')

// GET ALL REVIEWS
router.get('/', function (request, response) {
    console.log("## reviews ## /")
    Review.find({}, function (err, reviews) {
        if (err) {
            response.json({ message: "There was an error getting all reviews", error: true })
        } else {
            //Reverse the reviews so they're in new -> old order
            reviews.reverse()
            response.json({ message: "success", error: false, reviews: reviews })
        }
    })
})

// GET ALL REVIEWS FOR USER ID
router.post('/userid', function (request, response) {
    console.log("## reviews ## /userid")
    Review.find({ userid: request.body.userid }, function (err, reviews) {
        if (err) {
            response.json({ message: "There was an error getting all reviews for this user", error: true })
        } else {
            //Reverse the posts so they're in new -> old order
            console.log("Your query was successful, found this", reviews)
            reviews.reverse()
            response.json({ message: "success", error: false, reviews: reviews })
        }
    })
})

// CREATE REVIEW
router.post('/create', function (request, response) {
    console.log("## reviews ## /create")
    var review = new Review({ title: request.body.title, userid: request.body.userid, username: request.body.username, review: request.body.review, created_at: Date(), updated_at: Date(), flag: false })
    review.save(function (err) {
        if (err) {
            response.json({ message: "There was an error creating a new review", error: true })
        } else {
            response.json({ message: "success", error: false, newReview: review })
        }
    })
})

// DELETE ALL REVIEWS
router.delete('/deleteAll', function (request, response) {
    console.log("## reviews ## /deleteAll")
    Review.remove({}, function (err) {
        if (err) {
            response.json({ message: "There was an error deleting all reviews", error: true })
        } else {
            response.json({ message: "success", error: false })
        }
    })
})

router.get('/counter', function (request, response){
    console.log("## reviews ## /counter")
    Review.find({}, function(err, reviews){
        if(err){
            response.json({message: "THere was an error getting all reviews for counter", error: true})
        } else {
            let temp = reviews.length
            response.json({message: "success", error: false, count: temp})
        }
    })
})

module.exports = router;