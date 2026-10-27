// User.js
// Mongoose schema for a registered user.
// Passwords are stored as bcrypt hashes, never plain text.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // stores the hashed password
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
