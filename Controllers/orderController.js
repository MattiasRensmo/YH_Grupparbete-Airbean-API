
const Order = require("../Models/Order")

exports.placeOrder = async (req, res) => {
    // const orderData = {
    //     type: "order",
    //     orderNumber: 123,
    //     products: [
    //         {productID: 1, quantity: 1, price: 49},
    //         {productID: 2, quantity: 2, price: 49}
    //     ],
    //     userID: "123ABC"
    // }

    try {
        const orderData = req.body
        const insertOrder = await Order.placeOrder(orderData)
        return res.status(201).json({success: true, order: insertOrder})
    } catch (error) {
        console.error("Error when placing an order", error)
        return res.status(500).json({success: false, message: "Failed to place en order"})
    }
}


exports.getOrderHistory = async (req, res) => {
    try {
        const userID = req.params.userID

        const orderHistory = await Order.getOrderHistory(userID)

        if (!orderHistory || orderHistory.length === 0) {
            return res.status(404).json({success: false, message: `No orders found for user ${userID}`})
        }

        return res.status(200).json({success: true, orderHistory: orderHistory})

    } catch (error) {
        console.error("Error retrieving orders", error)
        return res.status(500).json({success: false, message: "Error retrieving orders"})
    }
}
