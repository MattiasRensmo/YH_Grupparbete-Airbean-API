const { GetOrderByID, CreateOrder } = require('../models/order-model')
const moment = require('moment')
moment.locale('sv')

//Allmänna funktioner
function calculateEta(etaTime) {
  if (moment(etaTime).isAfter()) {
    return moment(etaTime).fromNow()
  }
  return 'Kaffet är levererat'
}

// FIXME Tillfällig funktion
function GetMenuItemById(id) {
  const menu = [
    {
      id: 1,
      title: 'Bryggkaffe',
      desc: 'Bryggd på månadens bönor.',
      price: 39,
    },
    {
      id: 2,
      title: 'Caffè Doppio',
      desc: 'Bryggd på månadens bönor.',
      price: 49,
    },
    {
      id: 3,
      title: 'Cappuccino',
      desc: 'Bryggd på månadens bönor.',
      price: 49,
    },
    {
      id: 4,
      title: 'Latte Macchiato',
      desc: 'Bryggd på månadens bönor.',
      price: 49,
    },
    {
      id: 5,
      title: 'Kaffe Latte',
      desc: 'Bryggd på månadens bönor.',
      price: 54,
    },
    {
      id: 6,
      title: 'Cortado',
      desc: 'Bryggd på månadens bönor.',
      price: 39,
    },
  ]
  const idx = menu.findIndex(item => item.id == id)
  if (idx == -1) return undefined
  return menu[idx]
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
      // eta: moment(data.delivery).fromNow(),
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

PlaceCoffeeOrder = (req, res) => {
  const body = req.body

  let orderTotalPrice = 0

  try {
    //Har vi fått en order?
    if (!('order' in body)) {
      throw {
        status: 400,
        message: 'Formatera din beställning rätt!',
      }
    }
    //Finns det produkter i ordern?
    if (body.order.length < 1) {
      throw {
        status: 400,
        message: 'Du måste beställa något!',
      }
    }

    // Är varje produkt i ordern korrekt?
    body.order.forEach(item => {
      const { id, price, amount } = item

      //TODO Skapa funktionen GetMenuItemById
      const menuItem = GetMenuItemById(id)

      //Finns produkten i menyn?
      if (!menuItem) {
        throw {
          status: 404,
          message: 'Du kan bara beställa från menyn!',
        }
      }

      //Har produkten rätt pris
      if (menuItem.price != price) {
        throw {
          status: 400,
          message: 'Fuska inte med priset!',
        }
      }

      //Lägg till kostnaden i totalen
      orderTotalPrice += price * amount
    })

    //Skapa en random väntetid
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const waitTime = rand(15, 45)

    //Spara till DB
    CreateOrder({
      type: 'order',
      delivery: moment().add(waitTime, 'minutes'),
      orderDate: moment().format('YYYY-MM-DD'),
      price: orderTotalPrice,
      customer: body.customer || null,
    })
      //Svara användaren
      .then(dbRes => {
        res.json({
          status: 'success',
          orderNum: dbRes._id,
          eta: calculateEta(dbRes.delivery),
        })
      })
      //Fånga och skicka vidare fel
      .catch(err => {
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
