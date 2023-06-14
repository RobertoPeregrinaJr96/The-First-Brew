const express = require('express')
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



module.exports = router
