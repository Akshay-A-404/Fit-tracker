// WorkoutCard.jsx
import { Link } from 'react-router-dom';

export default function WorkoutCard({ workout, onDelete }) {
  return (
    <div className="card">
      <h3>{workout.workoutName}</h3>
      <p><strong>Exercise:</strong> {workout.exercise}</p>
      <p><strong>Sets x Reps:</strong> {workout.sets} x {workout.reps}</p>
      <p><strong>Weight:</strong> {workout.weight} kg</p>
      <p><strong>Volume:</strong> {workout.sets * workout.reps * workout.weight} kg</p>
      {workout.caloriesBurned > 0 && (
        <p><strong>Calories Burned:</strong> {workout.caloriesBurned} kcal</p>
      )}
      <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
      <div className="card-actions">
        <Link to={`/edit-workout/${workout._id}`} className="btn-secondary">Edit</Link>
        <button className="btn-danger" onClick={() => onDelete(workout._id)}>Delete</button>
      </div>
    </div>
  );
}
