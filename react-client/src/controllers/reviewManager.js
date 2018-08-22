
function getAllReviews() {
    console.log("## reviewManager ## getAllReviews()")
    return new Promise((resolve, reject) => {
        fetch('/reviews/')
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function getUserReviews(data) {
    console.log("## reviewManager ## getUserReviews()")
    return new Promise((resolve, reject) => {
        fetch('/reviews/userid', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

function createReview(data) {
    console.log("## reviewManager ## createReview()")
    return new Promise((resolve, reject) => {
        fetch('/reviews/create', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })


}

function editReview(data) {
    console.log("## reviewManager ## editReview()")
}

function deleteSingleReview(data) {
    console.log("## reviewManager ## deleteSingleReview()")
}

function deleteAllReviews() {
    console.log("## reviewManager ## deleteAllReviews()")
    return new Promise((resolve, reject) => {
        fetch('/reviews/deleteAll', {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => resolve(res))
    })
}

module.exports = {
    getAllReviews,
    getUserReviews,
    createReview,
    editReview,
    deleteSingleReview,
    deleteAllReviews,
}