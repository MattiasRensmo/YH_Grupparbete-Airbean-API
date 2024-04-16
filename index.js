const express = require('express')
const beans = require('./Routes/BeansRoute') //Mattias
const user = require('./Routes/UserRoute') //Kristofer

const app = express()
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

app.use(express.json())

// ROUTES
app.use('/api/beans', beans) //Mattias
app.use('/api/user', user) //Kristofer

app.use('/api/users', userRoutes) //Joel
app.use('/api', orderRoutes) //Joel

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
