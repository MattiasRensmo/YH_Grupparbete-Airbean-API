const { GetOrderByID, CreateOrder } = require('../models/order-model')

const { getProduct } = require('../models/menu-model')

const moment = require('moment')
moment.locale('sv')

// #--- Allmänna funktioner ---#
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function calculateEta(etaTime) {
  if (moment(etaTime).isAfter()) {
    return moment(etaTime).fromNow()
  }
  return 'Kaffet är levererat'
}

function handleError([status, message], res = undefined) {
  console.error('Error:', status, message)
  if (res)
    res.status(status).json({
      status: 'error',
      error: message,
    })
}

CheckOrderId = async (req, res) => {
  const id = req.params.orderId
  try {
    if (!id) {
      throw {
        status: 404,
        message: 'Du måste ange ordernummer!',
      }
    }

    //Kolla vilken ETA vi har i databasen
    const data = await GetOrderByID(id)

    if (data == null) {
      throw {
        status: 404,
        message: 'Hittar inte ordernumret!!',
      }
    }
    res.json({
      orderNum: data._id,
      eta: calculateEta(data.delivery),
    })
  } catch (error) {
    //Hantera alla error på ett ställe
    console.error(error)
    res.status(error.status).json({
      status: 'error',
      error: error.message,
    })
  }
}

PlaceCoffeeOrder = async (req, res) => {
  let orderTotalPrice = 0

  try {
    //Har vi fått en order?
    if (!('order' in req.body))
      return handleError([400, 'Formatera din beställning rätt!'], res)

    const { order, customer } = req.body

    //Finns det produkter i ordern?
    if (order < 1) return handleError([400, 'Du måste beställa något!'], res)

    // Vi går igenom varje produkt i en klassisk for-loop för att enkelt kunna bryta oss ut med en return
    for (let i = 0; i < order.length; i++) {
      const { id, price, amount } = order[i]
      const menuItem = await getProduct(id)

      //Finns den beställda produkten på menyn?
      if (!menuItem)
        return handleError([404, 'Du kan bara beställa från menyn!'], res)

      //Har produkten rätt pris
      if (menuItem.price != price)
        return handleError([400, 'Fuska inte med priset!'], res)

      //Lägg till kostnaden i totalen
      orderTotalPrice += price * amount
    }

    //Skapa en random väntetid
    const waitTime = rand(15, 45)

    //Spara till DB
    CreateOrder({
      type: 'order',
      delivery: moment().add(waitTime, 'minutes'),
      orderDate: moment().format('YYYY-MM-DD'),
      price: orderTotalPrice,
      customer: customer || null,
    })
      //Svara användaren
      .then((dbRes) => {
        res.json({
          status: 'success',
          orderNum: dbRes._id,
          eta: calculateEta(dbRes.delivery),
        })
      })
      //Fånga och skicka vidare fel
      .catch((err) => {
        console.error(err)
        throw {
          status: 500,
          message: 'Kunde inte lägga order. Försök igen.',
        }
      })

    //Hantera alla error på ett ställe
  } catch (error) {
    console.error(error)
    res.status(error.status).json({
      status: 'error',
      error: error.message,
    })
  }
}

module.exports = { CheckOrderId, PlaceCoffeeOrder }
