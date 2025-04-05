import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, getSessionUser } from '../services/authService';
import { useUser } from '../context/UserContext';
import NavBar from './components/NavBar';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await loginUser(formData);                   
      const sessionUser = await getSessionUser();  
      setUser(sessionUser);                          
      navigate('/dashboard');                       
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        {error && <p className="error">{error}</p>}

        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </>
  );
}
