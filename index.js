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

app.get('/', async (req, res) => {
  // Find all documents in the collection
  //Här kan vi använda type om vi vill hitta något av en särskild typ.
  //type: 'menu' - type: 'user', - type: 'order'
  const dbRes = await db.find({ type: 'menu' })

  console.log(dbRes)
  res.send(dbRes)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
