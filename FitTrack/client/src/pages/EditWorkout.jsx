// EditWorkout.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';

export default function EditWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    const fetchWorkout = async () => {
      const res = await api.get('/workouts');
      const workout = res.data.find((w) => w._id === id);
      if (workout) {
        setForm({
          ...workout,
          date: workout.date ? workout.date.slice(0, 10) : ''
        });
      }
    };
    fetchWorkout();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.put(`/workouts/${id}`, form);
      showToast('Workout updated!');
      navigate('/history');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update workout');
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <h2>Edit Workout</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="workoutName" value={form.workoutName} onChange={handleChange} required />
        <input name="exercise" value={form.exercise} onChange={handleChange} required />
        <input name="sets" type="number" value={form.sets} onChange={handleChange} required />
        <input name="reps" type="number" value={form.reps} onChange={handleChange} required />
        <input name="weight" type="number" value={form.weight} onChange={handleChange} required />
        <input name="caloriesBurned" type="number" placeholder="Calories Burned (optional estimate)" value={form.caloriesBurned || ''} onChange={handleChange} />
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <button type="submit" className="btn-primary">Update Workout</button>
      </form>
    </div>
  );
}
