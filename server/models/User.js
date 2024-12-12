//user schema

const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username is unique
  password: { type: String, required: true }, // Password will be hashed for security
  income: { type: [Number], default: [0, 0, 0] }, // Array for past 3 months' income
  expenditures: {
    transport: { type: Number, default: 0 },
    housing: { type: Number, default: 0 },
    bills: { type: Number, default: 0 },
    recreation: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
  }
});

// Create and export the model
module.exports = mongoose.model('User', userSchema);