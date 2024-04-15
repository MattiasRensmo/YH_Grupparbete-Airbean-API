const db = require("../index")

// Hämta en användares orderhistorik
exports.getOrderHistory = async (req, res) => {
    try {
        const userID = req.params.userID
        const orders = await db.findOne({ type: "orders"})

        if (!orders) {
            return res.status(404).json({success: false, message: "No orders found"})
        }

        const orderHistory = orders.orders.filter(order => order.userID == userID)
        if (!orderHistory) {
            return res.status(404).json({success: false, message: "No orders found"})
        }

        return res.status(200).json({success: true, orderHistory: orderHistory})
    } catch (error) {
        console.error("Failed to retrieve orders", error)
        return res.status(500).json({success: false, message: "Failed to retrieve orders"})
    }
}