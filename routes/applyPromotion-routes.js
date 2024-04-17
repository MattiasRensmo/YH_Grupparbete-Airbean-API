const { updatePromotionData, useApplyPromotion } = require("../controllers/applyPromotion-controller");

exports.registerPromotionRoutes = (app) => {
  app.post("/applyPromotion", useApplyPromotion);
};