const nedb = require('nedb-promise')
const db = new nedb({ filename: 'database.db', autoload: true })
const moment = require('moment')
moment.locale('sv')

const GetOrderByID = async id => {
  const dbEntry = await db.findOne({ _id: id })
  return dbEntry
}

const CreateOrder = async content => {
  dbRes = await db.insert(content)
  return dbRes
}

const getOrderHistory = async userID => {
  try {
    const orderHistory = await db.find(
      { type: 'order', customer: userID },
      { orderDate: 1, price: 1, _id: 0 }
    )
    console.log(orderHistory)

    if (!orderHistory) {
      return res
        .status(404)
        .json({ success: false, message: 'No orders found' })
    }
    //TODO Ordna så vi får ut datumet på rätt sätt. Ska vi formatera om det som ligger eller lägga in det på nytt?
    // const formatedDates = orderHistory.map(order => {
    //   date: moment(order.delivery).format('YYYY-MM-DD'), order.price
    // })
    // // console.log(orderHistory)
    return orderHistory
  } catch (error) {
    console.error('Failed to retrieve order history', error)
    throw new Error('Failed to retrieve order history')
  }
}

module.exports = { GetOrderByID, CreateOrder, getOrderHistory }
