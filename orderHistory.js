const express = require("express")
const {db} = require("./index")

const router = express.Router()

router.get("/api/user/:userID/history", async (req, res) => {
    try {
        const userID = req.params.userID

        // Hämta alla ordrar från databasen mha "type": "orders"
        const orders = await db.findOne({ type: "orders"})
        if (!orders) {
            return res.status(404).json({success: false, message: "No orders found"})
        }
        // Filtrera ut ordrar tillhörande specifikt userID
        const orderHistory = orders.orders.filter(order => order.userID == userID)
        return res.status(200).json({success: true, orderhistory: orderHistory})

    } catch (error) {
        console.error("Error retrieving orders", error)
        return res.status(500).json({success: false, message: "Error retrieving orders"})
    }
})

module.exports = router

// För att importera modulen: const orderHistory = require("./orderHistory.js")

