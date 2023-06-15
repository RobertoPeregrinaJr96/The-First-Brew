const express = require('express')
const { Coffee, Item, Review, ShoppingCart, User } = require('../../db/models');

const router = express.Router();
// GEt all items
router.get('/', async (req, res) => {

    // are there any items?
    const allItems = await Item.findAll();

    if (!allItems) return res.status(404).json({ "message": "Cannot find any any items" })

    res.status(200).json({ "Items": [...allItems] })
})
// Get item by Id
router.get('/:itemId', async (req, res) => {

    const itemId = req.params.itemId

    const oneItem = await Item.findByPk(itemId)
    if (!oneItem) return res.status(404).json({ "message": "Cannot find any Coffee items" })

    res.status(200).json({ "oneItem": [oneItem] })
})

router.put('/:itemId', async (req, res) => {

    const idOfItem = req.params.itemId
    console.log("idOfItem", idOfItem)
    const item = await Item.findByPk(idOfItem)
    console.log("item", item)

    let { coffeeId, cartId, instructionId, quantity } = req.body

    item.quantity = quantity

    await item.save();

    res.json(item)
})

router.delete('/:itemId', async (req, res) => {

    const idOfItem = req.params.itemId
    console.log("idOfItem", idOfItem)
    const item = await Item.findByPk(idOfItem)
    console.log("item", item)

    await item.destroy();

    res.json({
        "message": "Successfully delete"
    })


})

module.exports = router
