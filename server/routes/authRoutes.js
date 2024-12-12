//routes for login and signup 

const express = require('express');
const bcrypt = require('bcrypt'); // For hashing passwords
const User = require('../models/User'); // Import the User model

const router = express.Router();

// Route: Signup
router.post('/signup', async (req, res) => {
  console.log('Request Body Received:', req.body); // Log the request body

  const { username, password, income } = req.body;

  // Validate input
  if (!username || !password || !income || !Array.isArray(income) || income.length !== 3) {
    console.log('Invalid input:', { username, password, income }); // Log invalid data
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    const newUser = new User({
      username,
      password: hashedPassword,
      income,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error.message); // Log error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route: Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/userdata', async (req, res) => {
  const username = req.query.username;

  console.log('Userdata request received for username:', username);

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      income: user.income,
      expenditures: user.expenditures,
    });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
});



// Route: Update user data
router.post('/update', async (req, res) => {
  const { username, income, expenditures } = req.body;

  console.log('Update request received:', { username, income, expenditures });

  if (!username || !income || !expenditures) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.income = income;
    user.expenditures = { ...user.expenditures, ...expenditures };

    await user.save();
    res.status(200).json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error.message);
    res.status(500).json({ message: 'Error updating user data', error: error.message });
  }
});


module.exports = router;
