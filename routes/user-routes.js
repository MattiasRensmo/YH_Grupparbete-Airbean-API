const express = require('express')
const router = express.Router()

const userController = require('../controllers/user-controller')

// Base: '/api/user'

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
// Hämta en användares orderhistorik
router.get('/:userID/history', userController.getOrderHistory)

module.exports = router
