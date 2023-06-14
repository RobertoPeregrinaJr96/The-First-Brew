const express = require('express')
const { Coffee, Item, Review, ShoppingCart, User } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {

    // are there any items?
    const allItems = await Item.findAll();
    console.log("------------------------")
    console.log("allItems:", allItems)
    console.log("------------------------")
    if (!allItems) return res.status(404).json({ "message": "Cannot find any any items" })

    res.status(200).json({ "Items": [...allItems] })
})

router.get('/:itemId', async (req, res) => {

    const itemId = req.params.itemId

    const oneItem = await Item.findByPk(itemId)
    if (!oneItem) return res.status(404).json({ "message": "Cannot find any Coffee items" })

    res.status(200).json({ "oneItem": [oneItem] })
})


module.exports = router
