const nedb = require("nedb-promise");
const db = new nedb({ filename: "database.db", autoload: true });

exports.getMenu = async (req, res) => {
  try {
    const menuItems = await db.find({ type: "menu" });
    console.log(menuItems);
    return menuItems;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
exports.getProduct = async (productId) => {
  try {
    const menu = await db.findOne({ type: "menu" });
    console.log("Menu:", menu);
 
    const menuProducts = menu.menu;
    console.log("Menu.menu:", menu.menu);
    if (!menuProducts) {
      console.error("Menu products not found");
      return null;
    }
    const product = menuProducts.find((product) => product.id == productId);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
