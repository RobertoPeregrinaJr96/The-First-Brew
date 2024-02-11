const express = require('express')
const { Coffee, Item, Review, ShoppingCart, User } = require('../../db/models');

const router = express.Router();
// GET All Reviews
router.get('/', async (req, res) => {

    const allReviews = await Review.findAll();
    if (!allReviews) return res.status(404).json({ "message": "Cannot find any Reviews items" })
    res.status(200).json({ "Reviews": [...allReviews] })


})
// GET Users Review
router.get('/current', async (req, res) => {

    const { user } = req;
    // console.log("user", user)
    const idOfUser = user.id;
    // console.log("id", idOfUser)
    const userReviewArr = await Review.findAll({ where: { userId: idOfUser } })
    // console.log("userReviewArr:", userReviewArr[0])
    const userReview = userReviewArr[0]
    // console.log(userReview)

    if (!userReview) return res.status(404).json({ "message": "Cannot find the Users Chart" })

    const responseReview = {
        "id": userReview.id,
        "coffeeId": userReview.itemId,
        "userId": userReview.userId,
        "title": userReview.title,
        "review": userReview.review,
        "createdAt": userReview.createdAt,
        "updatedAt": userReview.updatedAt,
    }

    res.status(200).json({ "userReview": [responseReview] })
})

// Update
router.put('/:reviewId/reviews', async (req, res) => {

    const { user } = req;
    // console.log("user", user)
    const idOfUser = user.id;
    const idOfReview = Number(req.params.reviewId);

    const { coffeeId, userId, title, rating, review } = req.body
    // console.log("--------------------------------------")
    // console.log("idOfReview", idOfReview)
    // console.log("idOfUser in Backend", userId)
    // console.log("idOfCoffee  in Backend", coffeeId)
    // console.log("title in Backend", title)
    // console.log("rating in backend", rating)
    // console.log("review in Backend", review)
    // console.log("--------------------------------------")

    const oldReview = await Review.findByPk(idOfReview)
    // console.log("oldReview:", oldReview)

    oldReview.title = title
    oldReview.rating = rating
    oldReview.review = review

    // console.log("newReview:", oldReview)
    await oldReview.save()
    res.status(200).json(oldReview)
})

// DELETE
router.delete('/:reviewId', async (req, res) => {
    console.log("---------------------------------------")
    // let get all the data from the request
    const { user } = req;
    const idOfUser = user.id;
    // console.log(`idOfUser In BackEnd`, idOfUser)
    // console.log("---------------------------------------")
    const idOfReview = req.params.reviewId;
    // console.log('idOfReview In BackEnd', idOfReview)
    // console.log("---------------------------------------")
    const reviewTest = await Review.findByPk(idOfReview);
    // console.log('reviewTest In BackEnd ', reviewTest)
    const deleteReview = reviewTest.dataValues
    // console.log('deleteReview In BackEnd ', deleteReview)
    // console.log("---------------------------------------")
    // const reviewTest = await Review.findAll({ where: { id: idOfReview } });
    // console.log('reviewTest In BackEnd ', reviewTest)
    // const deleteReview = reviewTest.find(review => user.id == review.id)
    // console.log('deleteReview In BackEnd ', deleteReview)
    // console.log("---------------------------------------")
    // let check if the review is valid
    // if (!reviewTest) return res.status(404).json({ "message": "Review couldn't be found" });
    // let check if this review belongs to the user and if not the return an error

    // if (idOfUser !== reviewTest.userId) return res.status(403).json({ "message": "Forbidden" });
    // if we are the owner the we are allowed to delete
    await reviewTest.destroy();
    // console.log("---------------------------------------")
    return res.status(200).json({ "message": reviewTest })


})

module.exports = router
