const { applyPromotion,  } = require('../models/applyPromotion-model')

exports.useApplyPromotion = async (req, res) => {
  try {
    const checkout = req.body.checkout
    const promotionResult = await applyPromotion(checkout)
    res.status(200).json({
      status: 'success',
      promotionResult,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: 'Kampanjen kunde inte tillämpas!',
      message: error.message,
    })
  }
}



