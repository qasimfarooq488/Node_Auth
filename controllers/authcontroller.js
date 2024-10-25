const User = require('../models/userschema.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User Registration
const register = async (req, res) => {
  const { username, email, password } = req.body; // destructuring from req.body
  try {
    const user = await User.create({ username, email, password }); // creating new user using mongoose create method
    res.status(201).json({ message: 'User registered successfully', userId: user._id }); // respond with userId
  } catch (error) {
    res.status(400).json({ error: 'User registration failed', details: error.message });
  }
};

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }); // find user by email
    if (!user || !(await bcrypt.compare(password, user.password))) { // check if user exists and passwords match
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' }); // create token
    res.json({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(400).json({ error: 'Login failed', details: error.message });
  }
};

// Protected Route
const protectedRoute = (req, res) => {
  res.json({ message: 'You are authenticated', userId: req.user.userId });
};


module.exports = {
  register,
  login,
  protectedRoute,
};
