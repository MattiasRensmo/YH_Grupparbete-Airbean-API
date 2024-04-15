const express = require('express')
const router = express.Router()
const { CheckOrderId, PlaceCoffeeOrder } = require('../controllers/Beans')

//Frågetecknet nedan gör att vi använder denna route även om det saknas ett orderID
router.get('/order/status/:orderId?', CheckOrderId)
router.post('/order', PlaceCoffeeOrder)

module.exports = router
