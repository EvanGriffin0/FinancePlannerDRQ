//js server file that connects to mongodb server and confirms it has connected succesfully
const dotenv = require('dotenv');

//link to user authentication route
const authRoutes = require('./routes/authRoutes');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//specifying location for env file
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
