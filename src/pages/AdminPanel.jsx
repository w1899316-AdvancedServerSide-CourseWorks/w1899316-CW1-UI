import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { getAllUsers, deleteUser } from '../services/userService';
import Navbar from './components/NavBar';

export default function AdminPanel() {
  const navigate = useNavigate();
  const { user, loadingUser } = useUser();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!loadingUser && (!user || user.role !== 'admin')) {
      navigate('/dashboard');
    }
  }, [user, loadingUser, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res);
    } catch (err) {
      console.error('Failed to fetch users');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (err) {
      console.error('Delete failed');
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  if (loadingUser) return <p className="container">Loading...</p>;
  console.log(user)
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Admin Panel</h2>

        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginBottom: '20px',
            padding: '10px',
            width: '100%',
            borderRadius: '6px',
            border: '1px solid #ccc'
          }}
        />

        {filteredUsers.length === 0 ? (
          <p style={{ color: '#888' }}>No users found.</p>
        ) : (
          <table className="api-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userId}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.created_at}</td>
                  <td>
                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDelete(user.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
