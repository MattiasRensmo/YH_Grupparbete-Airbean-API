const express = require('express')
const orderRoutes = require("./Routes/orderRoutes")

const app = express()
const PORT = 8000

app.use(express.json())

app.use("/api", orderRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
