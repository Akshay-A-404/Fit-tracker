// AddWorkout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';

export default function AddWorkout() {
  const [form, setForm] = useState({
    workoutName: '', exercise: '', sets: '', reps: '', weight: '', caloriesBurned: '', date: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/workouts', form);
      showToast('Workout added!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add workout');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Workout</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="workoutName" placeholder="Workout Name (e.g. Push Day)" onChange={handleChange} required />
        <input name="exercise" placeholder="Exercise (e.g. Bench Press)" onChange={handleChange} required />
        <input name="sets" type="number" placeholder="Sets" onChange={handleChange} required />
        <input name="reps" type="number" placeholder="Reps" onChange={handleChange} required />
        <input name="weight" type="number" placeholder="Weight (kg)" onChange={handleChange} required />
        <input name="caloriesBurned" type="number" placeholder="Calories Burned (optional estimate)" onChange={handleChange} />
        <input name="date" type="date" onChange={handleChange} />
        <button type="submit" className="btn-primary">Save Workout</button>
      </form>
    </div>
  );
}
