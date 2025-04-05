import React from 'react';
import { useUser } from '../../context/UserContext';
import earthIcon from '../../assests/icons/earth.png';
export default function NavBar() {
  const { user, loadingUser } = useUser();

  return (
    <div className="navbar">
      <div className="navbar-title">
        <img src={earthIcon} alt="Earth Icon" className="logo-icon" />
        <h3>Rest Countries</h3>
      </div>
      {loadingUser ? (
        <div className="navbar-user">Loading user...</div>
      ) : user ? (
        <div className="navbar-user">
          Logged in as <strong>{user.email}</strong>
        </div>
      ) : (
        <div className="navbar-user">Not logged in</div>
      )}
    </div>
  );
}
