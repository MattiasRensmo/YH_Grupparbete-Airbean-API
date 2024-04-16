const { updatePromotionData, useApplyPromotion } = require("../controllers/applyPromotionController");

exports.registerPromotionRoutes = (app) => {
  app.post("/applyPromotion", useApplyPromotion);
};