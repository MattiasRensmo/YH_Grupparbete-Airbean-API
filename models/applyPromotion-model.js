const db = require('../database/database')

async function applyPromotion(checkout) {
  try {
    if (!Array.isArray(checkout)) {
      throw new Error('Checkout is not a valid array')
    }

    const menu = await db.find({ type: 'menu' })
    console.log(menu)
    const menuProducts = menu
    const combos = menu.combo
    // Definition of rules
    const promotionRules = {
      minQuantityForDiscount: 3,
      combos: combos,
    }

    const productQuantities = checkQuantities(checkout)
    const processedProducts = processProducts(
      checkout,
      menuProducts,
      promotionRules,
      productQuantities
    )
    const totalComboDiscount = calculateTotalComboDiscount(
      productQuantities,
      combos
    )

    return {
      order: processedProducts,
      promotionApplied:
        totalComboDiscount > 0 ||
        processedProducts.some(
          (product) =>
            product.price !==
            menuProducts.find((p) => p.id === product.id).price
        ),
      totalComboDiscount: totalComboDiscount.toFixed(2),
    }
  } catch (error) {
    console.error('Error applying promotion:', error)
    throw error
  }
}

/* -------------------------------------------------------------------------------------------------- */

//Checks product's quantities
function checkQuantities(checkout) {
  const productQuantities = {}
  for (const product of checkout) {
    const productId = product.id
    productQuantities[productId] = (productQuantities[productId] || 0) + 1
  }
  return productQuantities
}

/*--------------------------------- QUANTITY PROMOTION----------------------------- */

//Checks through the products and defines if they are elegible for the promoton
//If is elegible, calculates discunt price otherwise keeps the original price
//Adds the processed product to the array processedProduct (if it doesn not already exist)
//Returns the array
function processProducts(
  checkout,
  menuProducts,
  promotionRules,
  productQuantities
) {
  const processedProducts = []
  for (const product of checkout) {
    const productId = product.id
    const menuProduct = menuProducts.find((p) => p.id === productId)
    const isEligibleForPromotion = isProductEligibleForPromotion(
      menuProduct,
      promotionRules,
      productQuantities[productId]
    )
    const price = isEligibleForPromotion
      ? calculateDiscountedPrice(menuProduct.price)
      : menuProduct.price
    const existingProduct = processedProducts.find((p) => p.id === productId)
    if (!existingProduct) {
      processedProducts.push({
        id: productId,
        price: price,
        amount: productQuantities[productId],
      })
    }
  }
  return processedProducts
}

//Checks and returns if the product exists in the checkout
//if its promotion is active
//if the quantity rules are satisfied
function isProductEligibleForPromotion(menuProduct, promotionRules, quantity) {
  return (
    menuProduct &&
    (menuProduct.activePromotion ||
      menuProduct.activePromotion === undefined) &&
    quantity >= promotionRules.minQuantityForDiscount
  )
}

/*--------------------------------- COMBO DISCOUNT----------------------------- */

//Checks in the combos (menu.combos) and gets list of the combos products
//Checks the min. quantity existing in the checkout
//Accumulate the total discount based on the number of combos closed
function calculateTotalComboDiscount(productQuantities, combos) {
  let totalComboDiscount = 0
  for (const combo of combos) {
    const comboProducts = combo.products
    const comboDiscount = combo.discount
    const comboQuantity = Math.min(
      ...comboProducts.map((productId) => productQuantities[productId] || 0)
    )
    totalComboDiscount += comboDiscount * comboQuantity
  }
  return totalComboDiscount
}

function calculateDiscountedPrice(price) {
  const discount = price * 0.1 // 10%
  return Math.floor(price - discount)
}

module.exports = {
  applyPromotion,
}
