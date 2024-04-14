const express = require('express')
const router = express.Router()

//Frågetecknet nedan gör att vi använder denna route även om det saknas ett orderID
router.get('/order/status/:orderId?', (req, res) => {
  const id = req.params.orderId
  console.log(id)
  if (id) {
    //TODO: Kolla vilken ETA vi har i databasen
    res.send({
      status: 'success',
      orderNum: id,
      eta: 12,
    })
  } else {
    res.status(404).send({
      status: 'error',
      error: 'Hittar inte ordernumret',
    })
  }
})

module.exports = router
