const { applyPromotion } = require("../models/applyPromotionModel");


exports.useApplyPromotion = async (req, res) => {
  try {
    const checkout = req.body.checkout;
    const promotionResult = await applyPromotion(checkout);
    res.status(200).json({
      status: "success",
      promotionResult
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: "Kampanjen kunde inte tillämpas!",
      message: error.message 
    });
  }
  };


  /*---- för att fungera---- */
//lägg till "combo"-nyckeln till produkterna (t.ex. "combo" : [3, 4] eller [])
//lägg till activePromotion=true (eller false)
//endpoint /order accepterar discountedPrice om "promotionApplied": true (måste bli accepterad som body parameter)

  /*--------- best of the best if----- */
//order accepteras som frivilliga parameter i body:n även totalDiscount
//orderHistorik accepteras som frivilliga parameter i body:n även totalDiscount
