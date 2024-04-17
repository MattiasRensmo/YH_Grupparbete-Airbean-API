const express = require('express')
const router = express.Router()
const {
  CheckOrderId,
  PlaceCoffeeOrder,
} = require('../controllers/BeansController')
// const {
//   getAllMenuItems,
//   getProductById,
// } = require('../controllers/menu-controller')

// Base: '/api/beans'

// router.get('/', getAllMenuItems)
// router.get('/:id', getProductById)

//Frågetecknet nedan gör att vi använder denna route även om det saknas ett orderID
router.get('/order/status/:orderId?', CheckOrderId)
router.post('/order', PlaceCoffeeOrder)

module.exports = router
