const express = require('express')
const router = express.Router()
const user = require('../controllers/UserController')

// // Placera en order
// router.post("/order", orderController.placeOrder)

// Hämta en användares orderhistorik
router.get('/:userID/history', user.getOrderHistory)

module.exports = router
