const { addPromotionData, deleteMistake, addRightMenu, applyPromotion } = require("../models/applyPromotionModel");

exports.updatePromotionData = async (req, res) => {
  try {
    const updatedData = await addPromotionData();
    res.status(200).json(updatedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error" });
  }
};

exports.useApplyPromotion = async (req, res) => {
  try {
    const checkout = req.body.checkout;
    const promotionResult = await applyPromotion(checkout);
    res.status(200).json(promotionResult);
  } catch (error) {
    console.error("Error applying promotion:", error);
    res.status(500).json({ error: "Error applying promotion", message: error.message });
  }
};
