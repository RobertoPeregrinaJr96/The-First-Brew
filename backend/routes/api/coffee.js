const express = require('express')

const { Coffee, Item, Review, ShoppingCart, User, CoffeeImage, Instruction, Additions } = require('../../db/models');


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
    // console.log("user", user)
    const idOfUser = user.id;
    const idOfCoffee = req.params.coffeeId;
    // console.log("idOfCoffee", idOfCoffee)
    const { cartId, coffeeId, instructions } = req.body
    // console.log("--------------------------------------")
    // console.log("cartId", cartId)
    // console.log("coffeeId", coffeeId)
    // console.log("instructionId", instructionId)
    // console.log("--------------------------------------")

    // create a conditional for if there is and item with the same itemId in and if so then grab that item instead and update its QUANTITY by 1

    const adds = Additions.findAll({ where: { name: instructions.size, name: instructions.milk, name: instructions.temperature, name: instructions.shot } })
    console.log("--------------------------------------")
    console.log('adds in backend',adds)
    console.log("--------------------------------------")

    const newInstructions = await Instruction.create({
        itemId: instructions.itemId,
        additions: adds,
        // size: instructions.size,
        // milk: instructions.milk,
        // temperature: instructions.temperature,
        // shot: instructions.shot,
        custom: instructions.custom
    })
    console.log("--------------------------------------")
    console.log('newInstructions in backend',newInstructions)
    console.log("--------------------------------------")

    const newItem = await Item.create({
        cartId,
        coffeeId,
        quantity: 1,
        instructionId: newInstructions.id
    })
    console.log("--------------------------------------")
    console.log('newItem in backend',newItem)
    console.log("--------------------------------------")
    res.status(200).json(newItem)
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
