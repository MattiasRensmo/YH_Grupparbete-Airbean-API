const Datastore = require('nedb-promise')
const db = new Datastore({ filename: './database/database.db', autoload: true })


class Order {

    static async createOrder(orderDetails) {

        const order = { // schema
            type: 'order',
            price: orderDetails.price,
            customer: orderDetails.items,
            items: orderDetails.items
        }
        return db.insert(order)
    }

    static async findOrderByUserId(userId) {
        return db.find({ type: 'order', userId })
    }
}

module.exports = Order