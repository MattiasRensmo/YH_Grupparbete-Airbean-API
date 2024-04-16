const express = require('express')
const beans = require('./Routes/BeansRoute') //Mattias
const user = require('./Routes/UserRoute') //Kristofer

const app = express()
const PORT = 5000

app.use(express.json())

app.use('/api/user', user) //Kristofer

// ROUTES
app.use('/api/beans', beans) //Mattias

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
