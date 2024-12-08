const express = require('express');
const mongoose = require('mongoose');

//specifying location for env file
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const cors = require('cors');

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
//set port to 4000
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
