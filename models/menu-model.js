const nedb = require('nedb-promise')
// const db = new nedb({ filename: "database.db", autoload: true });
const db = require('../database/database')

exports.getMenu = async () => {
  try {
    const menu = await db.find({ type: 'menu' })
    console.log(menu)
    const menuProducts = menu

    if (!menuProducts) {
      console.error('Menyn hittades inte')
      throw new Error('Menyn hittades inte')
    }
    return menuProducts
  } catch (error) {
    console.error('Error fetching menu:', error)
    throw error
  }
}

exports.getProduct = async (productId) => {
  try {
    const menuItem = await db.findOne({ type: 'menu', id: +productId })

    if (!menuItem) {
      console.error('Produkten hittades inte')
      return null
    }

    return menuItem
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

exports.addItemsToDb = async (newItems) => {
  const dbRes = await db.insert(newItems)
  return dbRes
}

exports.deleteItemFromDb = async (id) => db.remove({ _id: id })
