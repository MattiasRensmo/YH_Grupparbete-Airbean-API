// import express from 'express'
const express = require('express')
const beans = require('./Routes/Beans')

const app = express()
const PORT = 5000

app.use(express.json())

// ROUTES
app.use('/api/beans', beans)

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
