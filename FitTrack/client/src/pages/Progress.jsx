// Progress.jsx
// Body weight tracking page with a simple SVG line chart.

import { useEffect, useState } from 'react';
import api from '../api/axios';
import ConfirmModal from '../components/ConfirmModal';
import { useToast } from '../context/ToastContext';

function buildChartPoints(entries, width, height, padding) {
  if (entries.length === 0) return '';
  const weights = entries.map((e) => e.weight);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const range = max - min || 1;
  const stepX = entries.length > 1 ? (width - padding * 2) / (entries.length - 1) : 0;

  return entries
    .map((e, i) => {
      const x = padding + i * stepX;
      const y = height - padding - ((e.weight - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');
}

export default function Progress() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weightInput, setWeightInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await api.get('/bodyweight');
      setEntries(res.data);
    } catch (err) {
      showToast('Failed to load progress data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!weightInput) return;
    try {
      await api.post('/bodyweight', { weight: weightInput, date: dateInput || undefined });
      setWeightInput('');
      setDateInput('');
      showToast('Weight logged!');
      fetchEntries();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to log weight', 'error');
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/bodyweight/${deleteId}`);
      setEntries(entries.filter((e) => e._id !== deleteId));
      showToast('Entry deleted');
    } catch (err) {
      showToast('Failed to delete entry', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  const latest = entries[entries.length - 1];
  const previous = entries[entries.length - 2];
  const first = entries[0];

  const changeSinceLast = latest && previous ? (latest.weight - previous.weight).toFixed(1) : null;
  const changeSinceStart = latest && first ? (latest.weight - first.weight).toFixed(1) : null;

  const width = 600;
  const height = 220;
  const padding = 30;
  const points = buildChartPoints(entries, width, height, padding);

  return (
    <div>
      <h2>Body Weight Progress</h2>

      <div className="form-container" style={{ maxWidth: 500 }}>
        <h3 className="section-title">Log Today's Weight</h3>
        <form onSubmit={handleAdd} style={{ flexDirection: 'row', gap: '10px' }}>
          <input
            type="number"
            step="0.1"
            placeholder="Weight (kg)"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            required
          />
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <button type="submit" className="btn-primary">Log</button>
        </form>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : entries.length === 0 ? (
        <p>No entries yet. Log your first weigh-in above.</p>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{latest.weight} kg</span>
              <span className="stat-label">Current Weight</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">
                {changeSinceLast !== null ? `${changeSinceLast > 0 ? '+' : ''}${changeSinceLast} kg` : '—'}
              </span>
              <span className="stat-label">Change Since Last Entry</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">
                {changeSinceStart !== null ? `${changeSinceStart > 0 ? '+' : ''}${changeSinceStart} kg` : '—'}
              </span>
              <span className="stat-label">Total Change</span>
            </div>
          </div>

          <h3 className="section-title">Trend</h3>
          <div className="chart-container">
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
              <polyline points={points} fill="none" stroke="#ef4444" strokeWidth="3" />
              {entries.map((e, i) => {
                const weights = entries.map((en) => en.weight);
                const min = Math.min(...weights);
                const max = Math.max(...weights);
                const range = max - min || 1;
                const stepX = entries.length > 1 ? (width - padding * 2) / (entries.length - 1) : 0;
                const x = padding + i * stepX;
                const y = height - padding - ((e.weight - min) / range) * (height - padding * 2);
                return <circle key={e._id} cx={x} cy={y} r="4" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />;
              })}
            </svg>
          </div>

          <h3 className="section-title">Log</h3>
          <div className="card-grid">
            {[...entries].reverse().map((e) => (
              <div className="card" key={e._id}>
                <h3>{e.weight} kg</h3>
                <p>{new Date(e.date).toLocaleDateString()}</p>
                <div className="card-actions">
                  <button className="btn-danger" onClick={() => setDeleteId(e._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <ConfirmModal
        open={!!deleteId}
        message="Delete this weight entry?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
