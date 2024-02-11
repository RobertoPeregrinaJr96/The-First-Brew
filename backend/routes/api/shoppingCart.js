const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Coffee, Item, Review, ShoppingCart, User, CoffeeImage, Instruction, InstructionItem, Addition } = require('../../db/models');


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
router.get('/current', async (req, res) => {

    console.log('--------------------------------------------')
    const { user } = req;
    // console.log("user", user)
    const idOfUser = user.id;
    // console.log("id", idOfUser)
    idOfUser == undefined ? res.status(400).json({ message: 'No user Found' }) : console.log('there is a user')
    console.log('--------------------------------------------')
    const userCartArr = await ShoppingCart.findAll({ where: { userId: idOfUser } })
    console.log('--------------------------------------------')
    // console.log("userCartArr:", userCartArr[0])
    const userCart = userCartArr[0]
    console.log('--------------------------------------------')
    // console.log('userCart', userCart)
    console.log('--------------------------------------------')
    const items = await Item.findAll({
        where: { cartId: userCart.id },
        include: [{ model: Coffee }, { model: Instruction, include: { model: InstructionItem, include: Addition } }]
    })
    console.log('--------------------------------------------')
    // console.log("items:", items)
    console.log('--------------------------------------------')
    const safeItem = items.map(item => {
        // console.log('item in map', item)
        // console.log("item.Instruction", item.dataValues['Instructions'])
        // console.log("item.Coffee", item.dataValues['Coffee'])
        return {

            id: item.dataValues['id'],
            cartId: item.dataValues['cartId'],
            coffeeId: item.dataValues['coffeeId'],
            instructionId: item.dataValues['instructionId'],
            quantity: item.dataValues['quantity'],
            createdAt: item.dataValues['createdAt'],
            updatedAt: item.dataValues['updatedAt'],
            Coffee: item.dataValues['Coffee'],
            Instruction: item.dataValues['Instructions'].map(value => {
                // console.log('=======================')
                // console.log('value.map', value)
                // console.log('=======================')
                // console.log("value.dataValues['id']", value.dataValues['id'])
                return {
                    id: value.dataValues['id'],
                    itemId: value.dataValues['itemId'],
                    custom: value.dataValues['custom'],
                    createdAt: value.dataValues['createdAt'],
                    updatedAt: value.dataValues['updatedAt'],
                    InstructionItem: value.dataValues['InstructionItems']
                }
            })
        }
    })
    // console.log('--------------------------------------------')
    // console.log('safeItem', safeItem)

    if (!userCartArr) return res.status(404).json({ "message": "Cannot find the Users Chart" })

    const responseCart = {
        "id": userCart.id,
        "userId": idOfUser,
        "itemId": userCart.itemId,
        "createdAt": userCart.createdAt,
        "updatedAt": userCart.updatedAt,
        "Items": [...safeItem.sort((a, b) => a.updatedAt + b.updatedAt)]
    }
    // console.log('-------------------------')
    // console.log('responseCart', responseCart)
    // console.log('-------------------------')
    res.status(200).json({ "UserCart": [responseCart] })
})

module.exports = router
