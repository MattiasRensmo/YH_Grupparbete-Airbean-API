const {getAllMenuItems, getProductById } = require("../controllers/menuController");

exports.registerMenuRoutes = (app) => {
  app.get("/menu", getAllMenuItems);
  app.get("/menu/:id", getProductById);
};
