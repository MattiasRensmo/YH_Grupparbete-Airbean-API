const express = require("express")
const userController = require("../Controllers/userController")
const router = express.Router()

// Hämta en användares orderhistorik
router.get("/user/:userID/history", userController.getOrderHistory)

module.exports = router


