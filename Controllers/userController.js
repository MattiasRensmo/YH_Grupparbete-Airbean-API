
const OrderHistory = require("../Models/Order")

exports.getOrderHistory = async (req, res) => {
    try {
        const userID = req.params.userID

        const orderHistory = await OrderHistory(userID)

        if (!orderHistory) {
            return res.status(404).json({success: false, message: "No orders found"})
        }

        return res.status(200).json({success: true, orderHistory: orderHistory})

    } catch (error) {
        console.error("Error retrieving orders", error)
        return res.status(500).json({success: false, message: "Error retrieving orders"})
    }
}
