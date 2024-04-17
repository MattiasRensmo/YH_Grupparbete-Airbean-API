const express = require("express")
const router = express.Router()
const menuController = require("../Controllers/menuController")


// Hämta en meny 
router.get("/", menuController.getMenu)

module.exports = router
