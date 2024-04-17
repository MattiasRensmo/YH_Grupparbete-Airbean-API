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
        message: 'Det finns inga produkter i ordern',
      }
    }

    for (const menuItem of newItems) {
      const requiredFields = ['type', 'id', 'title', 'desc', 'price']

      const isValid = requiredFields.every((field) =>
        Object.keys(menuItem).includes(field)
      )
      if (!isValid)
        throw {
          status: 400,
          message: 'Data är felformaterad',
        }
    }

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
