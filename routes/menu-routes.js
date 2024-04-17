const {
  getAllMenuItems,
  getProductById,
  addProduct,
  deleteProduct,
} = require('../controllers/menu-controller')

const express = require('express')
const router = express.Router()

// Base: '/api/menu'

//Visa hela menyn
router.get('/', getAllMenuItems)

//Visa en produkt
router.get('/:id', getProductById)

//Lägg till produkt(er)
router.post('/', addProduct)

//Radera produkt
router.delete('/:id', deleteProduct)

module.exports = router
