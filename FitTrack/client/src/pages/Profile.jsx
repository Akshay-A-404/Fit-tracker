// Profile.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Profile() {
  const { user, login } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/profile');
      setName(res.data.name);
    } catch (err) {
      showToast('Failed to load profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleNameSave = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/auth/profile', { name });
      login({ ...user, name: res.data.name }, localStorage.getItem('token'));
      showToast('Name updated!');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update name', 'error');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    try {
      await api.put('/auth/password', passwordForm);
      setPasswordForm({ currentPassword: '', newPassword: '' });
      showToast('Password changed!');
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to change password');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user?.email}</p>

      <h3 className="section-title">Update Name</h3>
      <form onSubmit={handleNameSave}>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
        <button type="submit" className="btn-primary">Save Name</button>
      </form>

      <h3 className="section-title">Change Password</h3>
      {passwordError && <p className="error">{passwordError}</p>}
      <form onSubmit={handlePasswordChange}>
        <input
          type="password"
          placeholder="Current Password"
          value={passwordForm.currentPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={passwordForm.newPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
          required
          minLength={6}
        />
        <button type="submit" className="btn-primary">Change Password</button>
      </form>
    </div>
  );
}
