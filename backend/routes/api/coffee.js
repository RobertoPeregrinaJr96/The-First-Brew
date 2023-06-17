const express = require('express')
// const bcrypt = require('bcryptjs');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { User } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');


// const { Op } = require('sequelize');
const { Coffee, Item, Review, ShoppingCart, User } = require('../../db/models');


const router = express.Router();

// GET all COFFEE items
router.get('/', async (req, res) => {

    // are there any coffee items?
    const allCoffee = await Coffee.findAll();
    if (!allCoffee) return res.status(404).json({ "message": "Cannot find any Coffee items" })

    res.status(200).json({ "Coffee": [...allCoffee] })
})
// Get Coffee by Id
router.get('/:coffeeId', async (req, res) => {
    // is there a specific coffee
    // console.log("--------------------------------------")
    const coffeeId = req.params.coffeeId
    // console.log("coffeeId in BackEND COFFEE", coffeeId)
    const coffee = await Coffee.findByPk(Number(coffeeId))
    // console.log("coffee in BackEND COFFEE", coffee)
    if (!coffee) return res.status(404).json({ "message": "Cannot find any Coffee items" })
    // console.log("--------------------------------------")

    res.status(200).json(coffee)
})

// Create a Item
router.post('/:coffeeId', async (req, res) => {

    const { user } = req;
    console.log("user", user)
    const idOfUser = user.id;
    const idOfCoffee = req.params.coffeeId;
    // console.log("idOfCoffee", idOfCoffee)
    const { cartId, coffeeId, instructionId } = req.body
    // console.log("--------------------------------------")
    // console.log("cartId", cartId)
    // console.log("coffeeId", coffeeId)
    // console.log("instructionId", instructionId)
    // console.log("--------------------------------------")

    // create a conditional for if there is and item with the same itemId in and if so then grab that item instead and update its QUANTITY by 1

    const newItem = await Item.create({
        cartId,
        coffeeId,
        quantity: 1,
        instructionId
    })
    res.status(200).json(newItem)
})
// GET A reviews for the coffee
router.get('/:coffeeId/reviews', async (req, res) => {
    // console.log("------------------------")
    // res.json({"Message":"I HATE IT HERE"})
    // console.log("------------------------")
    // console.log("------------------------")
    const idOfCoffee = req.params.coffeeId
    // console.log("idOfCoffee", idOfCoffee)
    const reviews = await Review.findAll({ where: { coffeeId: Number(idOfCoffee) } })
    // console.log("reviews:", reviews)
    res.status(200).json(reviews)
    // console.log("------------------------")
    // console.log("------------------------")
    // console.log("------------------------")
})
// POST A review for the coffee
router.post('/:coffeeId/reviews', async (req, res) => {
    // console.log("--------------------------------------")
    const { user } = req;
    console.log("user", user)
    const idOfUser = user.id;
    const idOfCoffee = req.params.coffeeId;
    const { coffeeId, userId, title, rating, review } = req.body
    console.log("reviewObj", review)
    console.log("idOfUser in Backend", review.idOfUser)
    console.log("idOfCoffee  in Backend", review.idOfCoffee)
    console.log("title in Backend", review.title)
    console.log("rating in backend", review.rating)
    console.log("review in Backend", review.review)

    const newReview = await Review.create({
        coffeeId: review.coffeeId,
        userId: review.userId,
        rating: review.rating,
        title: review.title,
        review: review.review
    })
    console.log("newReview:", newReview)
    await newReview.save()
    res.status(200).json(newReview)

    // console.log("--------------------------------------")
})

module.exports = router;
