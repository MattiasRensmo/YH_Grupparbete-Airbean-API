const db = require('../database/database')

const GetOrderByID = async (id) => {
  const dbEntry = await db.findOne({ _id: id })
  return dbEntry
}

const CreateOrder = async (content) => {
  dbRes = await db.insert(content)
  return dbRes
}

const getOrderHistory = async (userID) => {
  try {
    const orderHistory = await db.find(
      { type: 'order', customer: userID },
      { orderDate: 1, price: 1, _id: 0 }
    )
    return orderHistory
  } catch (error) {
    console.error('Failed to retrieve order history', error)
    throw new Error('Failed to retrieve order history')
  }
}

module.exports = { GetOrderByID, CreateOrder, getOrderHistory }
