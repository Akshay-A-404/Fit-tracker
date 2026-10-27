// BodyWeight.js
// Mongoose schema for a single body-weight log entry.

const mongoose = require('mongoose');

const bodyWeightSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weight: { type: Number, required: true }, // in kg
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('BodyWeight', bodyWeightSchema);
