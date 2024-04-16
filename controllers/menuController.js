const { getMenu, getProduct } = require ("../models/menuModel");

exports.getAllMenuItems = async (req, res) => {
  try {
      const menuItems = await getMenu();
      res.status(200).json({
        status: "success",
        menu: menuItems
      });
      
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error" });
    }
  }
  

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id; 
    const product = await getProduct(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error" });
  }
};
