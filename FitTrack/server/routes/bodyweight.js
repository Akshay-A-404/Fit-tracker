// bodyweight.js (routes)
// CRUD for body-weight log entries.

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const BodyWeight = require('../models/BodyWeight');

// GET /api/bodyweight - oldest first, for plotting a left-to-right chart
router.get('/', auth, async (req, res) => {
  try {
    const entries = await BodyWeight.find({ userId: req.userId }).sort({ date: 1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/bodyweight
router.post('/', auth, async (req, res) => {
  try {
    const { weight, date } = req.body;
    if (!weight) {
      return res.status(400).json({ message: 'Please enter a weight' });
    }

    const entry = new BodyWeight({
      userId: req.userId,
      weight,
      date: date || Date.now()
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/bodyweight/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await BodyWeight.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
