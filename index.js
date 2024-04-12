// import express from 'express'

const express = require('express')
const nedb = require('nedb-promise')

const db = new nedb({ filename: 'database.db', autoload: true })

const app = express()
const PORT = 5000

app.use(express.json())

// var menu = {
//   type: 'menu',
//   menu: [
//     {
//       id: 1,
//       title: 'Bryggkaffe',
//       desc: 'Bryggd på månadens bönor.',
//       price: 39,
//     },
//     {
//       id: 2,
//       title: 'Caffè Doppio',
//       desc: 'Bryggd på månadens bönor.',
//       price: 49,
//     },
//     {
//       id: 3,
//       title: 'Cappuccino',
//       desc: 'Bryggd på månadens bönor.',
//       price: 49,
//     },
//     {
//       id: 4,
//       title: 'Latte Macchiato',
//       desc: 'Bryggd på månadens bönor.',
//       price: 49,
//     },
//     {
//       id: 5,
//       title: 'Kaffe Latte',
//       desc: 'Bryggd på månadens bönor.',
//       price: 54,
//     },
//     {
//       id: 6,
//       title: 'Cortado',
//       desc: 'Bryggd på månadens bönor.',
//       price: 39,
//     },
//   ],
// }

// db.insert(menu, function (err, newDoc) {
//   // Callback is optional
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(newDoc)
//   }
//   // newDoc is the newly inserted document, including its _id
//   // newDoc has no key called notToBeSaved since its value was undefined
// })

// db.remove({ _id: 'KtGCCRq7dCI9IEWV' }, {}, function (err, numRemoved) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(numRemoved)
//   }
// })

const order1 = {
  type: 'order',
  _id: 1,
  leveranstid: '2024T11:40:00',
  price: 122,
  uid: undefined,
}
const order2 = {
  type: 'order',
  _id: 2,
  leveranstid: '2024T11:40:00',
  price: 122,
  uid: 'xxx',
}
const order14 = {
  type: 'order',
  _id: 14,
  leveranstid: '2024T11:40:00',
  price: 123,
  uid: 'xxx',
}

const user = { type: 'user', _id: 3, name: 'aaa', orderHistory: [2, 14] }
// user /  orders /
// Sök efter alla ordrar som har uid xxx

// bean /  status
// Sök igenom användarna till du hitta ngn med rätt ordernummer

app.get('/', async (req, res) => {
  // Find all documents in the collection
  //Här kan vi använda type om vi vill hitta något av en särskild typ.
  //type: 'menu' - type: 'user', - type: 'order'
  const dbRes = await db.find({ type: 'menu' })

  console.log(dbRes)
  res.send(dbRes)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
