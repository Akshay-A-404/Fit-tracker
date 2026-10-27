// Home.jsx
import { Link } from 'react-router-dom';
import { DumbbellIcon, BarbellIcon } from '../components/GymIcons';
import MotivationBanner from '../components/MotivationBanner';

export default function Home() {
  return (
    <div className="hero">
      <div className="hero-icon-row">
        <DumbbellIcon size={56} />
        <BarbellIcon size={90} />
        <DumbbellIcon size={56} />
      </div>

      <h1>Welcome to FitTrack</h1>
      <p>Track your workouts. Watch your body weight trend. Stay consistent.</p>

      <div className="hero-actions">
        <Link to="/register" className="btn-primary">Get Started</Link>
        <Link to="/login" className="btn-secondary">Login</Link>
      </div>

      <div className="hero-motivation">
        <MotivationBanner />
      </div>
    </div>
  );
}
