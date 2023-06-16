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
    const coffeeId = req.params.coffeeId
    const coffee = await Coffee.findByPk(coffeeId)
    if (!coffee) return res.status(404).json({ "message": "Cannot find any Coffee items" })

    res.status(200).json(coffee)
})

// Create a Item
router.post('/:coffeeId', async (req, res) => {

    const { user } = req;
    console.log("user", user)
    const idOfUser = user.id;
    const idOfCoffee = req.params.coffeeId;
    console.log("idOfCoffee", idOfCoffee)
    const { cartId, coffeeId, instructionId } = req.body
    console.log("--------------------------------------")
    console.log("cartId", cartId)
    console.log("coffeeId", coffeeId)
    console.log("instructionId", instructionId)
    console.log("--------------------------------------")

    // create a conditional for if there is and item with the same itemId in and if so then grab that item instead and update its QUANTITY by 1

    const newItem = await Item.create({
        cartId,
        coffeeId,
        quantity: 1,
        instructionId
    })
    res.status(200).json(newItem)
})

module.exports = router;
