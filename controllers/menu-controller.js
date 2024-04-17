const { getMenu, getProduct } = require("../models/menu-model");

exports.getAllMenuItems = async (req, res) => {
  try {
    const menuProducts = await getMenu();
    res.status(200).json({
      status: "success",
      menu: menuProducts,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: "Något gick fel, försök igen senare.",
      message: error.message 
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProduct(productId);
    if (!product) {
      return res.status(404).json({ message: "Produkten hittades inte!" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: "Något gick fel, försök igen senare.",
      message: error.message 
    });
  }
};
