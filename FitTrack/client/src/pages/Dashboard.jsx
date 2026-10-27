// Dashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import WorkoutCard from '../components/WorkoutCard';
import ConfirmModal from '../components/ConfirmModal';
import MotivationBanner from '../components/MotivationBanner';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const { user } = useAuth();
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

  const totalWorkouts = workouts.length;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeekCount = workouts.filter((w) => new Date(w.date) >= oneWeekAgo).length;

  const totalVolume = workouts.reduce(
    (sum, w) => sum + Number(w.sets) * Number(w.reps) * Number(w.weight),
    0
  );

  const todayStr = new Date().toDateString();
  const caloriesToday = workouts
    .filter((w) => new Date(w.date).toDateString() === todayStr)
    .reduce((sum, w) => sum + Number(w.caloriesBurned || 0), 0);

  const caloriesThisWeek = workouts
    .filter((w) => new Date(w.date) >= oneWeekAgo)
    .reduce((sum, w) => sum + Number(w.caloriesBurned || 0), 0);

  const recentWorkouts = workouts.slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <h2>Welcome back, {user?.name}</h2>
        <Link to="/add-workout" className="btn-primary">+ Add Workout</Link>
      </div>

      <MotivationBanner />

      {!loading && (
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{totalWorkouts}</span>
            <span className="stat-label">Total Workouts</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{thisWeekCount}</span>
            <span className="stat-label">This Week</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{totalVolume.toLocaleString()} kg</span>
            <span className="stat-label">Total Volume Lifted</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{caloriesToday.toLocaleString()}</span>
            <span className="stat-label">Calories Burned Today</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{caloriesThisWeek.toLocaleString()}</span>
            <span className="stat-label">Calories Burned This Week</span>
          </div>
        </div>
      )}

      <h3 className="section-title">Recent Workouts</h3>

      {loading ? (
        <p>Loading...</p>
      ) : recentWorkouts.length === 0 ? (
        <p>No workouts yet. Add your first one!</p>
      ) : (
        <div className="card-grid">
          {recentWorkouts.map((w) => (
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
