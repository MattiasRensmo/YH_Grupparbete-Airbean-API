const {
  getMenu,
  getProduct,
  addItemsToDb,
  deleteItemFromDb,
} = require('../models/menu-model')

exports.getAllMenuItems = async (req, res) => {
  try {
    const menuProducts = await getMenu()
    res.status(200).json({
      status: 'success',
      menu: menuProducts,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: 'Något gick fel, försök igen senare.',
      message: error.message,
    })
  }
}

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await getProduct(productId)
    if (!product) {
      return res.status(404).json({ message: 'Produkten hittades inte!' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: 'Något gick fel, försök igen senare.',
      message: error.message,
    })
  }
}

exports.addProduct = async (req, res) => {
  try {
    if (!('menuItems' in req.body)) {
      throw {
        status: 400,
        message: 'Formatera din beställning rätt!',
      }
    }

    newItems = req.body.menuItems

    //Finns det produkter i ordern?
    if (newItems.length < 1) {
      throw {
        status: 400,
        message: 'Du måste beställa något!',
      }
    }
    // TODO KOlla att alla fält som ska finnas finns.....

    const dbRes = await addItemsToDb(newItems)
    res.status(200).json(dbRes)
  } catch (error) {
    console.error(error)
    res.status(error.status).json({
      status: 'error',
      error: error.message,
    })
  }
}

exports.deleteProduct = async (req, res) => {
  const id = req.params.id
  try {
    if (!id) {
      throw {
        status: 400,
        message: 'Ange ett id',
      }
    }

    const dbRes = await deleteItemFromDb(id)
    res.status(200).json(dbRes)
  } catch (error) {
    console.error(error)
    res.status(error.status).json({
      status: 'error',
      error: error.message,
    })
  }
}

const menu = {
  type: 'menu',
  id: 1,
  title: 'Bryggkaffe',
  desc: 'Bryggd på månadens bönor.',
  price: 39,
  activePromotion: false,
  combo: [],
  discountedPrice: null,
  _id: 'xpoLZjEDFTRN0D5u',
}
