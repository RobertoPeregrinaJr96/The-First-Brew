const express = require('express')
const { Coffee, Item, Review, ShoppingCart, User, CoffeeImage, Instruction, InstructionItem, Addition } = require('../../db/models');

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
// UPDATE ITEM
router.put('/:itemId', async (req, res) => {
    const idOfItem = req.params.itemId
    const item = await Item.findByPk(idOfItem)

    let { coffeeId, cartId, instructionId, quantity } = req.body

    item.quantity = quantity

    await item.save();

    res.json(item)
})
// DELETE ITEM
router.delete('/:itemId', async (req, res) => {

    const idOfItem = req.params.itemId
    const item = await Item.findByPk(idOfItem)

    await item.destroy();

    res.json({
        "message": "Successfully delete"
    })


})
// Instruction update
router.put('/:itemId/Instruction', async (req, res) => {
    const idOfItem = req.params.itemId
    const [additions, custom] = req.body
    // Size
    const newSizeName = additions[0][0] // 'Small'
    const currentSizeId = additions[0][1] // '3'
    // finding the table to change
    const size = await InstructionItem.findByPk(currentSizeId)
    // finding the id for the new size by its name
    const sizeAddition = await Addition.findAll({ where: { name: newSizeName } })
    // saving the new Id to a variable
    const x1 = sizeAddition[0].dataValues['id']
    // reassigning the current variable with the new variable
    size.additionId = x1
    await size.save()
    // Milk
    const newMilkName = additions[1][0] // 'Small'
    const currentMilkId = additions[1][1] // '3'
    // finding the table to change
    const milk = await InstructionItem.findByPk(currentMilkId)
    // finding the id for the new milk by its name
    const milkAddition = await Addition.findAll({ where: { name: newMilkName } })
    // saving the new Id to a variable
    const x2 = milkAddition[0].dataValues['id']
    // reassigning the current variable with the new variable
    milk.additionId = x2
    await milk.save()
    // Temp
    const newTempName = additions[2][0] // 'Small'
    const currentTempId = additions[2][1] // '3'
    // finding the table to change
    const temp = await InstructionItem.findByPk(currentTempId)
    // finding the id for the new temp by its name
    const tempAddition = await Addition.findAll({ where: { name: newTempName } })
    // saving the new Id to a variable
    const x3 = tempAddition[0].dataValues['id']
    // reassigning the current variable with the new variable
    temp.additionId = x3
    await temp.save()
    // Shot
    const newShotName = additions[3][0] // 'Small'
    const currentShotId = additions[3][1] // '3'
    // finding the table to change
    const shot = await InstructionItem.findByPk(currentShotId)
    // finding the id for the new shot by its name
    const shotAddition = await Addition.findAll({ where: { name: newShotName } })
    // saving the new Id to a variable
    const x4 = shotAddition[0].dataValues['id']
    // reassigning the current variable with the new variable
    shot.additionId = x4
    await shot.save()

    const instruction = await Instruction.findByPk(custom[1])
    instruction.custom = custom[0]
    await instruction.save()

    const returnItem = await Item.findByPk(idOfItem, {
        include: [
            {
                model: Instruction, include: {
                    model: InstructionItem, include: Addition
                }
            }
        ]
    })
    res.status(200).json(returnItem)
})


module.exports = router
