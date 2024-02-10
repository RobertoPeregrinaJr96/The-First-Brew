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
    const idOfUser = user.id;
    const userReviewArr = await Review.findAll({ where: { userId: idOfUser } })
    const userReview = userReviewArr[0]

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
    const idOfUser = user.id;
    const idOfReview = Number(req.params.reviewId);

    const { coffeeId, userId, title, rating, review } = req.body

    const oldReview = await Review.findByPk(idOfReview)

    oldReview.title = title
    oldReview.rating = rating
    oldReview.review = review

    await oldReview.save()
    res.status(200).json(oldReview)
})

// DELETE
router.delete('/:reviewId', async (req, res) => {
    // let get all the data from the request
    const { user } = req;
    const idOfUser = user.id;
    const idOfReview = req.params.reviewId;
    const reviewTest = await Review.findByPk(idOfReview);
    const deleteReview = reviewTest.dataValues
    // const reviewTest = await Review.findAll({ where: { id: idOfReview } });
    // const deleteReview = reviewTest.find(review => user.id == review.id)
    // let check if the review is valid
    // if (!reviewTest) return res.status(404).json({ "message": "Review couldn't be found" });
    // let check if this review belongs to the user and if not the return an error

    // if (idOfUser !== reviewTest.userId) return res.status(403).json({ "message": "Forbidden" });
    // if we are the owner the we are allowed to delete
    await reviewTest.destroy();
    return res.status(200).json({ "message": reviewTest })


})

module.exports = router
