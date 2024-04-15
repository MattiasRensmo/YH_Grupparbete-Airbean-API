const express = require('express')
const app = express()
const userRoutes = require('./routes/userRoutes') 
const orderRoutes = require('./routes/orderRoutes') 

app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api', orderRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
