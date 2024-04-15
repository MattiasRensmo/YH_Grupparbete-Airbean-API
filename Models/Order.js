const db = require("../database")

const GetOrderHistory = async (userID) => {
        try {
            const orderHistory = await db.find({ type: "order", customer: userID})
            console.log(orderHistory)

            // const orderHistory = orders.filter(order => order.customer == userID)

            return orderHistory
        } catch (error) {
            console.error(error)
            throw new Error("Failed to retrieve orders")
        }
    }


module.exports = GetOrderHistory
