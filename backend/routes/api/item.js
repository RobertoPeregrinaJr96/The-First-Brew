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
    // console.log("---------------------------------")
    const idOfItem = req.params.itemId
    // console.log("idOfItem", idOfItem)
    const item = await Item.findByPk(idOfItem)
    // console.log("item", item)

    let { coffeeId, cartId, instructionId, quantity } = req.body

    item.quantity = quantity

    await item.save();

    // console.log("---------------------------------")
    res.json(item)
})
// DELETE ITEM
router.delete('/:itemId', async (req, res) => {

    const idOfItem = req.params.itemId
    // console.log("idOfItem", idOfItem)
    const item = await Item.findByPk(idOfItem)
    // console.log("item", item)

    await item.destroy();

    res.json({
        "message": "Successfully delete"
    })


})
// Instruction update
router.put('/:itemId/Instruction', async (req, res) => {
    console.log('========== PUT INSTRUCTION API ================')
    const idOfItem = req.params.itemId
    console.log('idOfItem:', idOfItem)
    console.log("---------------------------------")

    const [additions, custom] = req.body
    console.log('additions:', additions)
    console.log('custom:', custom)
    console.log("---------------------------------")
    // =========================================
    console.log("---------------------------------")
    // Size
    const newSizeName = additions[0][0] // 'Small'
    // console.log('newSizeName:', newSizeName)
    const currentSizeId = additions[0][1] // '3'
    // console.log('currentSizeId:', currentSizeId)
    // finding the table to change
    const size = await InstructionItem.findByPk(currentSizeId)
    // console.log('size:', size)
    // finding the id for the new size by its name
    const sizeAddition = await Addition.findAll({ where: { name: newSizeName } })
    // console.log('sizeAddition:', sizeAddition)
    // saving the new Id to a variable
    const x1 = sizeAddition[0].dataValues['id']
    // console.log('x1:', x1)
    // reassigning the current variable with the new variable
    size.additionId = x1
    await size.save()
    console.log("---------------------------------")
    // =========================================
    console.log("---------------------------------")
    // Milk
    const newMilkName = additions[1][0] // 'Small'
    // console.log('newMilkName:', newMilkName)
    const currentMilkId = additions[1][1] // '3'
    // console.log('currentMilkId:', currentMilkId)
    // finding the table to change
    const milk = await InstructionItem.findByPk(currentMilkId)
    // console.log('milk:', milk)
    // finding the id for the new milk by its name
    const milkAddition = await Addition.findAll({ where: { name: newMilkName } })
    // console.log('milkAddition:', milkAddition)
    // saving the new Id to a variable
    const x2 = milkAddition[0].dataValues['id']
    // console.log('x2:', x2)
    // reassigning the current variable with the new variable
    milk.additionId = x2
    await milk.save()
    console.log("---------------------------------")
    // =========================================
    console.log("---------------------------------")
    // Temp
    const newTempName = additions[2][0] // 'Small'
    // console.log('newTempName:', newTempName)
    const currentTempId = additions[2][1] // '3'
    // console.log('currentTempId:', currentTempId)
    // finding the table to change
    const temp = await InstructionItem.findByPk(currentTempId)
    // console.log('temp:', temp)
    // finding the id for the new temp by its name
    const tempAddition = await Addition.findAll({ where: { name: newTempName } })
    // console.log('tempAddition:', tempAddition)
    // saving the new Id to a variable
    const x3 = tempAddition[0].dataValues['id']
    // console.log('x3:', x3)
    // reassigning the current variable with the new variable
    temp.additionId = x3
    await temp.save()
    console.log("---------------------------------")
    // =========================================
    // Shot
    console.log("---------------------------------")
    const newShotName = additions[3][0] // 'Small'
    // console.log('newShotName:', newShotName)
    const currentShotId = additions[3][1] // '3'
    // console.log('currentShotId:', currentShotId)
    // finding the table to change
    const shot = await InstructionItem.findByPk(currentShotId)
    // console.log('shot:', shot)
    // finding the id for the new shot by its name
    const shotAddition = await Addition.findAll({ where: { name: newShotName } })
    // console.log('shotAddition:', shotAddition)
    // saving the new Id to a variable
    const x4 = shotAddition[0].dataValues['id']
    // console.log('x4:', x4)
    // reassigning the current variable with the new variable
    shot.additionId = x4
    await shot.save()
    console.log("---------------------------------")

    const instruction = await Instruction.findByPk(custom[1])
    // console.log('instruction.custom before .save():', instruction.custom)
    // console.log("---------------------------------")
    instruction.custom = custom[0]
    await instruction.save()
    // console.log('instruction.custom after .save():', instruction.custom)
    // console.log("---------------------------------")

    const returnItem = await Item.findByPk(idOfItem, {
        include: [
            {
                model: Instruction, include: {
                    model: InstructionItem, include: Addition
                }
            }
        ]
    })
    // console.log('returnItem:', returnItem.Instruction)
    console.log("---------------------------------")

    res.status(200).json(returnItem)
})


module.exports = router
