const express = require('express')
const beans = require('./Routes/Beans') //Mattias
const orderRoutes = require('./Routes/orderRoutes') //Kristofer

const app = express()
const PORT = 8000

app.use(express.json())

app.use('/api', orderRoutes) //Kristofer

// ROUTES
app.use('/api/beans', beans) //Mattias

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
