const Order = require('../models/order-model')

// exports.placeOrder = async (req, res) => {
//   try {
//     const orderDetails = req.body
//     orderDetails.userId = req.user._id // req.user bör ju sättas efter att användaren har loggats in
//     const order = await Order.createOrder(orderDetails) // vi skickar orderDetails som argument och väntar resultatet utav createOrder
//     res.status(200).send(order) // och skickar sedan ordern som ett respons-objekt
//   } catch (error) {
//     res.status(500).send({ error: 'Internal server error' })
//   }
// }

// exports.getOrderHistory = async (req, res) => {
//   try {
//     const userId = req.user._id // samma sak här... userns ID sätts ju när denne loggas in
//     const orders = await Order.findOrderByUserId(userId)
//     res.status(200).send(orders)
//   } catch (error) {
//     res.status(500).send({ error: 'Internal server error' })
//   }
// }
