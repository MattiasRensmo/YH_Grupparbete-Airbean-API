const { GetOrderByID, CreateOrder } = require('../models/Order')
const moment = require('moment')
moment.locale('sv')

CheckOrderId = (req, res) => {
  const id = req.params.orderId
  console.log(id)
  if (id) {
    //Kolla vilken ETA vi har i databasen
    GetOrderByID(id)
      .then(data => {
        // console.log('data', data)
        res.json({
          orderNum: data._id,
          eta: moment(data.delivery).fromNow(true),
        })
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({
          status: 'error',
          error: 'Hittar inte ordernumret',
        })
      })
  } else {
    res.json(404).send({
      status: 'error',
      error: 'Hittar inte ordernumret',
    })
  }
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

PlaceCoffeeOrder = (req, res) => {
  console.log(req.body)
  const body = req.body

  //Kolla att datan vi fått är bra
  if (!('order' in body)) {
    res.status(400).json({
      status: 'error',
      error: 'Formatera din beställning rätt!',
    })
    return
  }

  if (body.order.length < 1) {
    res.status(400).json({
      status: 'error',
      error: 'Du måste beställa något!',
    })
    return
  }

  let orderTotalPrice = 0
  let orderTotalDiscount = 0

  body.order.forEach(item => {
    const { id, price, amount } = item

    //TODO Skapa funktionen GetMenuItemById
    const menuItem = GetMenuItemById(id)
    if (!menuItem) {
      res.status(404).json({
        status: 'error',
        error: 'Du kan bara beställa från menyn!',
      })
      return
    }
    console.log(`Processing ${menuItem.title}`)

    if (menuItem.price != price) {
      res.status(400).json({
        status: 'error',
        error: 'Fuska inte med priset!',
      })
      return
    }

    let itemTotalPrice = price * amount

    //10 % rabatt om man beställer tre eller fler av samma produkt
    if (amount <= 3) {
      orderTotalDiscount += itemTotalPrice * 0.1
      itemTotalPrice -= itemTotalPrice * 0.1
    }

    orderTotalPrice += itemTotalPrice
  })

  //Lägg till en ETA
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const waitTime = rand(15, 45)

  //Spara till DB
  CreateOrder({
    type: 'order',
    delivery: moment().add(waitTime, 'minutes'),
    price: orderTotalPrice,
    customer: body.customer || null,
    //Svara användaren
  })
    .then(dbRes => res.json(dbRes))
    .catch(err => {
      console.error(err)
      res.status(500).json({
        status: 'error',
        error: 'Kunde inte lägga order. Försök igen.',
      })
    })

  //Hantera error

  // res.json({ coffee: 'yes' })

  const inn = {
    order: [
      {
        id: 1,
        price: 39,
        amount: 1,
      },
      {
        id: 3,
        price: 49,
        amount: 2,
      },
    ],
  }

  // const dbEntry = {
  //   type: 'order',
  //   delivery: '2024T11:40:00',
  //   price: 123,
  //   customer: 'xxx',
  // }
}

module.exports = { CheckOrderId, PlaceCoffeeOrder }
