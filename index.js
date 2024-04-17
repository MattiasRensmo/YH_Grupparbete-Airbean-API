const express = require('express')
const app = express()
const PORT = 5000

const beans = require('./routes/beans-routes') //Mattias
const orderRoutes = require('./routes/order-routes')
const userRoutes = require('./routes/user-routes')
const { registerMenuRoutes } = require('./routes/menuRoutes')
const { registerPromotionRoutes } = require('./routes/applyPromotionRoutes')

app.use(express.json())

// ROUTES
app.use('/api/beans', beans) //Mattias
app.use('/api/user', userRoutes) //Kristofer
app.use('/api', orderRoutes) //Joel ??????????????????????

// app.use('/api/user', userRoutes) //Joel

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
