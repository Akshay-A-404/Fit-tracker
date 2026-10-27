// History.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';
import WorkoutCard from '../components/WorkoutCard';
import ConfirmModal from '../components/ConfirmModal';
import { useToast } from '../context/ToastContext';

export default function History() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const { showToast } = useToast();

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const res = await api.get('/workouts');
      setWorkouts(res.data);
    } catch (err) {
      showToast('Failed to load workouts', 'error');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/workouts/${deleteId}`);
      setWorkouts(workouts.filter((w) => w._id !== deleteId));
      showToast('Workout deleted');
    } catch (err) {
      showToast('Failed to delete workout', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  const term = search.trim().toLowerCase();
  let filtered = workouts.filter(
    (w) =>
      w.workoutName.toLowerCase().includes(term) ||
      w.exercise.toLowerCase().includes(term)
  );

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'heaviest') return b.weight - a.weight;
    return 0;
  });

  return (
    <div>
      <h2>Workout History</h2>

      <div className="filter-bar">
        <input
          className="search-input"
          placeholder="Search by workout or exercise..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="heaviest">Heaviest First</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No workouts match your search.</p>
      ) : (
        <div className="card-grid">
          {filtered.map((w) => (
            <WorkoutCard key={w._id} workout={w} onDelete={setDeleteId} />
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!deleteId}
        message="Delete this workout? This can't be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
