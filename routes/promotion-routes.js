const express = require('express')
const router = express.Router()
const {
  useApplyPromotion,

} = require('../controllers/apply-promotion-controller')

//BASE: /api/promotion

router.post('/', useApplyPromotion)


module.exports = router
