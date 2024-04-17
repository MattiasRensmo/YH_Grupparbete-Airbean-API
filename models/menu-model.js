const nedb = require("nedb-promise");
const db = new nedb({ filename: "database.db", autoload: true });

exports.getMenu = async () => {
  try {
    const menu = await db.findOne({ type: "menu" });
    const menuProducts = menu.menu;

    if (!menuProducts) {
      console.error("Menyn hittades inte");
      throw new Error("Menyn hittades inte");
    }
    return menuProducts;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
};

exports.getProduct = async (productId) => {
  try {
    const menu = await db.findOne({ type: "menu" });
    const menuProducts = menu.menu;

    if (!menuProducts) {
      console.error("Produkten hittades inte");
      return null;
    }
    const product = menuProducts.find((product) => product.id == productId);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
