const db = require("../database")
const moment = require("moment")


const placeOrder = async (orderData) => {
    try {
        let totalPrice = 0
        const orderDate = moment().format("YYYY-MM-DDTHH:mm")

        orderData.products.forEach(product => {
            totalPrice += product.price * product.quantity
        })

        const order = {
            type: "order",
            userID: orderData.userID,
            totalPrice: totalPrice,
            orderDate: orderDate,
        }

        const insertOrder = await db.insert(order)
        return insertOrder
    } catch (error) {
        console.error("Failed to place an order", error)
        throw new Error("Failed to place an order")
    }
}


const getOrderHistory = async (userID) => {
    try {
        const orderHistory = await db.find({ type: "order", userID: userID}, { orderDate: 1, totalPrice: 1, _id: 0 })
        console.log(orderHistory)

        return orderHistory
    } catch (error) {
        console.error("Failed to retrieve order history", error)
        throw new Error("Failed to retrieve order history")
    }
}


module.exports = { placeOrder, getOrderHistory }
