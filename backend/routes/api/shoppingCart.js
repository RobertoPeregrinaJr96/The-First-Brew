const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Coffee, Item, Review, ShoppingCart, User } = require('../../db/models');

const router = express.Router();

// GET all ShoppingCart
router.get('/', async (req, res) => {

    // are there any coffee items?
    const allCart = await ShoppingCart.findAll();
    // console.log("allCoffee:", allCoffee)
    if (!allCart) return res.status(404).json({ "message": "Cannot find ShoppingCart" })

    res.status(200).json({ "ShoppingCart": [...allCart] })
})

// GET A SPECIFIC CART
router.get('/current', requireAuth, async (req, res) => {

    const { user } = req;
    console.log("user", user)
    const idOfUser = user.id;
    console.log("id", idOfUser)
    const userCart = await ShoppingCart.findAll({
        include: [{ model: Item }, { model: Coffee }],
        where: { userId: idOfUser }
    })
    if (!userCart) return res.status(404).json({ "message": "Cannot find the Users Chart" })
    res.status(200).json({ "UserCart": [userCart] })
})

module.exports = router
