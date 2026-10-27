// workout.js (routes)
// Full CRUD for workouts. All routes are protected by the "auth" middleware.

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Workout = require('../models/Workout');

// GET /api/workouts
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userId }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/workouts
router.post('/', auth, async (req, res) => {
  try {
    const { workoutName, exercise, sets, reps, weight, date, caloriesBurned } = req.body;

    if (!workoutName || !exercise || !sets || !reps || !weight) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const workout = new Workout({
      userId: req.userId,
      workoutName,
      exercise,
      sets,
      reps,
      weight,
      caloriesBurned: caloriesBurned || 0,
      date: date || Date.now()
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/workouts/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id, userId: req.userId });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    const { workoutName, exercise, sets, reps, weight, date, caloriesBurned } = req.body;
    if (workoutName) workout.workoutName = workoutName;
    if (exercise) workout.exercise = exercise;
    if (sets) workout.sets = sets;
    if (reps) workout.reps = reps;
    if (weight) workout.weight = weight;
    if (date) workout.date = date;
    if (caloriesBurned !== undefined) workout.caloriesBurned = caloriesBurned;

    await workout.save();
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/workouts/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
