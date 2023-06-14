const express = require('express')
const { Coffee, Item, Review, ShoppingCart, User } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {

    res.json({ "message": "Hello there at Review endpoint" })
})



module.exports = router
