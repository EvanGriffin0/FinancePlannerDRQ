const express = require('express');
const mongoose = require('mongoose');

//specifying location for env file
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
console.log(process.env.ATLAS_URL);
const cors = require('cors');

const app = express();
//set port to 4000
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB Atlas
mongoose.connect(process.env.ATLAS_URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Test route to check server functionality
app.get('/', (req, res) => {
  res.send('Hello, Finance Planner!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
