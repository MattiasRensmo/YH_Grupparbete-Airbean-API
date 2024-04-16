const { updatePromotionData, useApplyPromotion } = require("../controllers/applyPromotionController");

exports.registerPromotionRoutes = (app) => {
  app.post("/order/promotion", updatePromotionData);
};
exports.registerPromotionRoutes = (app) => {
  app.post("/order/promotion", useApplyPromotion);
};

