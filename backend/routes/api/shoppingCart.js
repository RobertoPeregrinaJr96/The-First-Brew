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
    if (!allCart) return res.status(404).json({ "message": "Cannot find ShoppingCart" })

    res.status(200).json({ "ShoppingCart": [...allCart] })
})

// GET A SPECIFIC CART
router.get('/current', async (req, res) => {

    const { user } = req;
    const idOfUser = user.id;
    idOfUser == undefined ? res.status(400).json({ message: 'No user Found' }) : console.log('there is a user')
    const userCartArr = await ShoppingCart.findAll({ where: { userId: idOfUser } })
    const userCart = userCartArr[0]
    const items = await Item.findAll({
        where: { cartId: userCart.id },
        include: [{ model: Coffee }, { model: Instruction, include: { model: InstructionItem, include: Addition } }]
    })
    const safeItem = items.map(item => {
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

    if (!userCartArr) return res.status(404).json({ "message": "Cannot find the Users Chart" })

    const responseCart = {
        "id": userCart.id,
        "userId": idOfUser,
        "itemId": userCart.itemId,
        "createdAt": userCart.createdAt,
        "updatedAt": userCart.updatedAt,
        "Items": [...safeItem.sort((a, b) => a.updatedAt + b.updatedAt)]
    }
    res.status(200).json({ "UserCart": [responseCart] })
})

module.exports = router
