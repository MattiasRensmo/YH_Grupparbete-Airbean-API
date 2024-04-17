const {getAllMenuItems, getProductById } = require("../controllers/menu-controller");

exports.registerMenuRoutes = (app) => {
  app.get("/beans", getAllMenuItems);
  app.get("/beans/:id", getProductById);
};
