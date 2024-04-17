const express = require('express')
const app = express()
const PORT = 5000

const beans = require('./routes/beans-routes') //Mattias
const userRoutes = require('./routes/user-routes')
const menuRoutes = require('./routes/menu-routes')
const { registerPromotionRoutes } = require('./routes/apply-promotion-routes')

app.use(express.json())

// ROUTES
app.use('/api/beans', beans) //Mattias
app.use('/api/menu', menuRoutes)
app.use('/api/user', userRoutes) //Kristofer

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
