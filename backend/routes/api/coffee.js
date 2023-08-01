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
    // console.log("--------------------------------------")
    const coffeeId = req.params.coffeeId
    // console.log("coffeeId in BackEND COFFEE", coffeeId)
    const coffee = await Coffee.findByPk(Number(coffeeId), { include: { model: CoffeeImage } })
    // console.log("coffee in BackEND COFFEE", coffee)
    if (!coffee) return res.status(404).json({ "message": "Cannot find any Coffee items" })
    // console.log("--------------------------------------")

    res.status(200).json(coffee)
})

// Create a Item
router.post('/:coffeeId', async (req, res) => {

    const { user } = req;
    //-------------------------------------------
    const idOfUser = user.id;
    //-------------------------------------------
    const idOfCoffee = req.params.coffeeId;
    //-------------------------------------------
    const { cartId, coffeeId, instructions } = req.body
    //-------------------------------------------
    // create a conditional for if there is and item with the same itemId in and if so then grab that item instead and update its QUANTITY by 1
    const newItem = await Item.create(
        {
            cartId,
            coffeeId,
            quantity: 1,
            instructionId: null
        }
    )
    // console.log('newItem', newItem)
    //-------------------------------------------
    const newItemInDB = await Item.findAll({ where: { id: newItem.id } })
    // console.log('newItemInDB',newItemInDB)
    //-------------------------------------------
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
    // console.log("--------------------------------------")
    // console.log('finalQuery in backend', finalQuery)
    // console.log("--------------------------------------")
    res.status(200).json(finalQuery)
})
// GET A reviews for the coffee
router.get('/:coffeeId/reviews', async (req, res) => {
    const idOfCoffee = req.params.coffeeId
    // console.log("idOfCoffee", idOfCoffee)
    const reviews = await Review.findAll({
        where: { coffeeId: Number(idOfCoffee) },
        include: [{ model: User }]
    })

    // console.log("----------------------------------")
    // console.log(reviews)
    // console.log("----------------------------------")



    res.status(200).json(reviews.sort((a, b) => {

        let aObj = a.dataValues

        let bObj = b.dataValues

        return aObj.id + bObj.id
    }))

})
// POST A review for the coffee
router.post('/:coffeeId/reviews', async (req, res) => {
    // console.log("--------------------------------------")
    const { user } = req;
    // console.log("user", user)
    const idOfUser = user.id;
    const idOfCoffee = req.params.coffeeId;
    const { coffeeId, userId, title, rating, review } = req.body
    // console.log("reviewObj", review)
    // console.log("idOfUser in Backend", review.idOfUser)
    // console.log("idOfCoffee  in Backend", review.idOfCoffee)
    // console.log("title in Backend", review.title)
    // console.log("rating in backend", review.rating)
    // console.log("review in Backend", review.review)

    const newReview = await Review.create({
        coffeeId: review.coffeeId,
        userId: review.userId,
        rating: review.rating,
        title: review.title,
        review: review.review
    })
    // console.log("newReview:", newReview)
    await newReview.save()
    res.status(200).json(newReview)

    // console.log("--------------------------------------")
})

module.exports = router;
