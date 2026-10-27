// Workout.js
// Mongoose schema for a single workout entry.
// Each document is ONE exercise, linked to the user who created it via userId.

const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workoutName: { type: String, required: true },
  exercise: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },        // in kg
  caloriesBurned: { type: Number, default: 0 },     // optional estimate, in kcal
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
