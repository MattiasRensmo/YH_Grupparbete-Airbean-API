const Order = require('../models/OrderModel')

// exports.placeOrder = async (req, res) => {

//     // Från frontend...
//     // const orderData = {
//     //     userID: "123ABC"
//     //     products: [
//     //         {productID: 1, quantity: 1, price: 49},
//     //         {productID: 2, quantity: 2, price: 49}
//     //     ],
//     // }

//     try {
//         const orderData = req.body
//         const insertOrder = await Order.placeOrder(orderData)
//         return res.status(201).json({success: true, order: insertOrder})
//     } catch (error) {
//         console.error("Error when placing an order", error)
//         return res.status(500).json({success: false, message: "Failed to place en order"})
//     }
// }

exports.getOrderHistory = async (req, res) => {
  try {
    const userID = req.params.userID

    const orderHistory = await Order.getOrderHistory(userID)

    return res.status(200).json({ success: true, orderHistory: orderHistory })
  } catch (error) {
    console.error('Error retrieving orders', error)
    return res
      .status(500)
      .json({ success: false, message: 'Error retrieving orders' })
  }
}
