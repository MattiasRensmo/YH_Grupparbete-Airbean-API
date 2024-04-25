const db = require("../database/database");
async function applyPromotion(checkout) {
  try {
    if (!Array.isArray(checkout) || checkout.length === 0) {
      throw new Error("Checkout is not a valid or empty array");
    }

    const menu = await db.find({ type: "menu" });
    const combosData = await db.findOne({ "combos.type": "combos" });
    const combos = combosData.combos;

    const menuProducts = menu;

    const promotionRules = {
      minQuantityForDiscount: 3,
      combos: combos,
    };

    const productQuantities = checkQuantities(checkout);
    const processedProducts = processProducts(checkout, menuProducts, promotionRules, productQuantities);
    const totalComboDiscount = calculateTotalComboDiscount(productQuantities, combos);

    return {
      order: processedProducts,
      promotionApplied:
        totalComboDiscount > 0 ||
        processedProducts.some((product) => product.price !== menuProducts.find((p) => p.id === product.id).price),
      totalComboDiscount: totalComboDiscount.toFixed(2),
    };
  } catch (error) {
    console.error("Error applying promotion:", error);
    throw error;
  }
}

/* -------------------------------------------------------------------------------------------------- */

//Checks product's quantities
function checkQuantities(checkout) {
  const productQuantities = {};
  for (const product of checkout) {
    const productId = product.id;
    productQuantities[productId] = (productQuantities[productId] || 0) + 1;
  }
  return productQuantities;
}

/*--------------------------------- QUANTITY PROMOTION----------------------------- */


function processProducts(checkout, menuProducts, promotionRules, productQuantities) {
  const processedProducts = [];
  for (const product of checkout) {
    const productId = product.id;
    const menuProduct = menuProducts.find((p) => p.id === productId);
    const isEligibleForPromotion = isProductEligibleForPromotion(
      menuProduct,
      promotionRules,
      productQuantities[productId]
    );
    const price = isEligibleForPromotion ? calculateDiscountedPrice(menuProduct.price) : menuProduct.price;
    const existingProduct = processedProducts.find((p) => p.id === productId);
    if (!existingProduct) {
      processedProducts.push({
        id: productId,
        price: price,
        amount: productQuantities[productId],
      });
    }
  }
  return processedProducts;
}


function isProductEligibleForPromotion(menuProduct, promotionRules, quantity) {
  return (
    menuProduct &&
    (menuProduct.activePromotion || menuProduct.activePromotion === undefined) &&
    quantity >= promotionRules.minQuantityForDiscount
  );
}

/*--------------------------------- COMBO DISCOUNT----------------------------- */

function calculateTotalComboDiscount(productQuantities, combos) {
  let totalComboDiscount = 0;
  for (const combo of combos) {
    const comboProducts = combo.products;
    const comboDiscount = combo.discount;
    const comboQuantity = Math.min(...comboProducts.map((productId) => productQuantities[productId] || 0));
    totalComboDiscount += comboDiscount * comboQuantity;
  }
  return totalComboDiscount;
}

function calculateDiscountedPrice(price) {
  const discount = price * 0.1; // 10%
  return Math.floor(price - discount);
}

module.exports = {
  applyPromotion,
};
