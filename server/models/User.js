//user schema

const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username is unique
  password: { type: String, required: true }, // Password will be hashed for security
});

// Create and export the model
module.exports = mongoose.model('User', userSchema);