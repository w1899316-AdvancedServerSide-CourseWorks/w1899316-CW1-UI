import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { logoutUser } from '../../services/authService';
import earthIcon from '../../assets/icons/earth.png';

export default function NavBar() {
  const { user, loadingUser, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-title">
        <img src={earthIcon} alt="Earth Icon" className="logo-icon" />
        <h3>Rest Countries</h3>
      </div>

      <div className="navbar-user">
        {loadingUser ? (
          <span>Loading user...</span>
        ) : user ? (
          <>
            Logged in as <strong>{user.email}</strong>
            {user.role === 'admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="admin-btn"
                style={{ marginLeft: '16px' }}
              >
                Admin Dashboard
              </button>
            )}

            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </div>
  );
}
