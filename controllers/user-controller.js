const Order = require('../models/order-model')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.getOrderHistory = async (req, res) => {
  try {
    const userID = req.params.userID

    const orderHistory = await Order.getOrderHistory(userID)

    return res.status(200).json({ success: true, orderHistory: orderHistory })
  } catch (error) {
    console.error('Error retrieving orders', error)
    return res
      .status(500)
      .json({ success: false, message: 'Error retrieving orders' })
  }
}

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findUserByUsername(username)

    if (user) {
      return res.status(409).send({ error: 'Username already exists' })
    }

    const newUser = await User.createUser(username, password)
    res.status(201).send({
      message: 'User created successfully',
      status: 'success',
      UID: newUser._id,
    })
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' })
  }
}

exports.loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findUserByUsername(username)

    if (!user) {
      return res.status(404).send({ error: 'User not found' })
    }
    // TODO SKa vi fortsätta ha Bcrypt
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' })
    }
    res.send({ message: 'Logged in successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Internal server error' })
  }
}
