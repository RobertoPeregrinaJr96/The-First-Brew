const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Coffee, Item, Review, ShoppingCart, User } = require('../../db/models');
const item = require('../../db/models/item');

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
    // console.log("user", user)
    const idOfUser = user.id;
    // console.log("id", idOfUser)
    const userCartArr = await ShoppingCart.findAll({ where: { userId: idOfUser } })
    console.log("userCartArr:", userCartArr[0])
    const userCart = userCartArr[0]
    console.log(userCart)
    const items = await Item.findAll({
        where: { cartId: userCart.id },
        include: [{ model: Coffee }]
    })
    // console.log("items:", items)

    if (!userCartArr) return res.status(404).json({ "message": "Cannot find the Users Chart" })

    const responseCart = {
        "id": userCart.id,
        "userId": idOfUser,
        "itemId": userCart.itemId,
        "quantity": userCart.quantity,
        "createdAt": userCart.createdAt,
        "updatedAt": userCart.updatedAt,
        "Items": [...items]
    }

    res.status(200).json({ "UserCart": [responseCart] })
})



module.exports = router
