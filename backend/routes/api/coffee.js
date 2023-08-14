const express = require('express')

const { Coffee, Item, Review, ShoppingCart, User, CoffeeImage, Instruction, InstructionItem, Addition } = require('../../db/models');
const additions = require('../../db/models/additions');


const router = express.Router();

// GET all COFFEE items
router.get('/', async (req, res) => {

    // are there any coffee items?
    const allCoffee = await Coffee.findAll({ include: { model: CoffeeImage } });
    if (!allCoffee) return res.status(404).json({ "message": "Cannot find any Coffee items" })

    res.status(200).json({ "Coffee": [...allCoffee] })
})
// Get Coffee by Id
router.get('/:coffeeId', async (req, res) => {
    // is there a specific coffee
    const coffeeId = req.params.coffeeId
    const coffee = await Coffee.findByPk(Number(coffeeId), { include: { model: CoffeeImage } })
    if (!coffee) return res.status(404).json({ "message": "Cannot find any Coffee items" })
    res.status(200).json(coffee)
})

// Create a Item
router.post('/:coffeeId', async (req, res) => {

    const { user } = req;
    const idOfUser = user.id;
    const idOfCoffee = req.params.coffeeId;
    const { cartId, coffeeId, instructions } = req.body
    const newItem = await Item.create(
        {
            cartId,
            coffeeId,
            quantity: 1,
            instructionId: null
        }
    )
    const newItemInDB = await Item.findAll({ where: { id: newItem.id } })
    const newInstructions = await Instruction.create(
        {
            itemId: newItemInDB[0].dataValues.id,
            instructionItemId: null,
            custom: instructions.custom
        }
    )
    //-------------------------------------------
    const newInstructionsInDB = await Instruction.findByPk(newInstructions.id)
    //-------------------------------------------
    newItem.instructionId = newInstructionsInDB.id
    //-------------------------------------------
    await newItem.save()
    // SIZE
    const size = await Addition.findAll(
        {
            where: {
                name: instructions.size
            }
        }
    )
    // MILK
    const milk = await Addition.findAll(
        {
            where: {
                name: instructions.milk
            }
        }
    )
    // TEMP
    const temperature = await Addition.findAll(
        {
            where: {
                name: instructions.temperature
            }
        }
    )
    // SHOT
    const shot = await Addition.findAll(
        {
            where: {
                name: instructions.shot
            }
        }
    )
    //-------------------------------------------
    // SIZE
    await InstructionItem.create({
        instructionId: newInstructionsInDB.id,
        additionId: size[0].dataValues.id ? size[0].dataValues.id : null
    })
    // MILK
    await InstructionItem.create({
        instructionId: newInstructionsInDB.id,
        additionId: milk[0].dataValues.id ? milk[0].dataValues.id : null
    })
    // TEMP
    await InstructionItem.create({
        instructionId: newInstructionsInDB.id,
        additionId: temperature[0].dataValues.id ? temperature[0].dataValues.id : null
    })
    // SHOT
    await InstructionItem.create({
        instructionId: newInstructionsInDB.id,
        additionId: shot[0].dataValues.id ? shot[0].dataValues.id : null
    })
    //-------------------------------------------
    const finalQuery = await Item.findByPk(newItemInDB[0].dataValues.id, {
        include: [
            {
                model: Instruction, include: {
                    model: InstructionItem, include: Addition
                }
            }
        ]
    }
    )
    //-------------------------------------------
    res.status(200).json(finalQuery)
})
// GET A reviews for the coffee
router.get('/:coffeeId/reviews', async (req, res) => {
    const idOfCoffee = req.params.coffeeId
    const reviews = await Review.findAll({
        where: { coffeeId: Number(idOfCoffee) },
        include: [{ model: User }]
    })
    res.status(200).json(reviews.sort((a, b) => {

        let aObj = a.dataValues

        let bObj = b.dataValues

        return aObj.id + bObj.id
    }))

})
// POST A review for the coffee
router.post('/:coffeeId/reviews', async (req, res) => {
    const { user } = req;
    const idOfUser = user.id;
    const idOfCoffee = req.params.coffeeId;
    const { coffeeId, userId, title, rating, review } = req.body
    const newReview = await Review.create({
        coffeeId: review.coffeeId,
        userId: review.userId,
        rating: review.rating,
        title: review.title,
        review: review.review
    })
    await newReview.save()
    res.status(200).json(newReview)

})

module.exports = router;
