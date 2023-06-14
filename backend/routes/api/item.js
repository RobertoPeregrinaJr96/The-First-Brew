const express = require('express')
const { Coffee, Item } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {

    res.json({ "message": "Hello there at item endpoint" })
})



module.exports = router
