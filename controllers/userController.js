// hanterar logiken för att ta emot och svara på klientbegäranden. man kan säga att klientens interaktioner med sidan hanteras här 

const User = require('../models/userModel');

exports.registerUser = async (req, res) => {

  try {

    const { username, password } = req.body;

    const user = await User.findUserByUsername(username);

    if (user) {
      return res.status(409).send({ error: 'Username already exists' });
    }
    await User.createUser(username, password);
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });

  }

};



exports.loginUser = async (req, res) => {

  const { username, password } = req.body;

  try {

    const user = await User.findUserByUsername(username);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    res.send({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });

  }

};
