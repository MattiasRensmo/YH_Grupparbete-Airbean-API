const {getAllMenuItems, getProductById } = require("../controllers/menuController");

exports.registerMenuRoutes = (app) => {
  app.get("/beans", getAllMenuItems);
  app.get("/beans/:id", getProductById);
};
