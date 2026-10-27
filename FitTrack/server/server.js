// server.js
// Entry point of the backend. Sets up middleware, connects to MongoDB,
// and mounts our route files.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workout');
const bodyWeightRoutes = require('./routes/bodyweight');

const app = express();

// --- Middleware ---
app.use(cors());          // allow requests from the React app (different port)
app.use(express.json());  // parse incoming JSON request bodies into req.body

// --- Test route ---
app.get('/', (req, res) => {
  res.send('FitTrack API is running...');
});

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/bodyweight', bodyWeightRoutes);

// --- Connect to MongoDB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
