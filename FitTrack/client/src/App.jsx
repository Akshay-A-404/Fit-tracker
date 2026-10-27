// App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddWorkout from './pages/AddWorkout';
import EditWorkout from './pages/EditWorkout';
import History from './pages/History';
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add-workout" element={<ProtectedRoute><AddWorkout /></ProtectedRoute>} />
          <Route path="/edit-workout/:id" element={<ProtectedRoute><EditWorkout /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </main>
    </>
  );
}
