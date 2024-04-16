const express = require("express")
const router = express.Router()
const orderController = require("../Controllers/orderController")

// Placera en order
router.post("/order", orderController.placeOrder)

// Hämta en användares orderhistorik
router.get("/user/:userID/history", orderController.getOrderHistory)

module.exports = router


