const express = require('express')
const orderRoutes = require("./Routes/orderRoutes")
const menuRoutes = require("./Routes/menuRoutes")

const app = express()
const PORT = 8000

app.use(express.json())

app.use("/api", orderRoutes)
app.use("/api/menu", menuRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
