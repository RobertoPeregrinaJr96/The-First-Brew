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
    // console.log("allCoffee:", allCoffee)
    if (!allCoffee) return res.status(404).json({ "message": "Cannot find any Coffee items" })

    res.status(200).json({ "Coffee": [...allCoffee] })
})

router.get('/:coffeeId', async (req, res) => {
    // is there a specific coffee
    const coffeeId = req.params.coffeeId
    const oneCoffee = await Coffee.findByPk(coffeeId)
    if (!oneCoffee) return res.status(404).json({ "message": "Cannot find any Coffee items" })

    res.status(200).json({ "oneCoffee": [oneCoffee] })
})
module.exports = router;
