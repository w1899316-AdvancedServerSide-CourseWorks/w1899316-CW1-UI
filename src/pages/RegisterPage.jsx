import React, { useState, useEffect } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useUser } from '../context/UserContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await registerUser(formData);
      setMessage('✅ Registration successful! Redirecting to login...');
      setFormData({ firstName: '', lastName: '', email: '', password: '' });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
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
          <button type="submit">Register</button>
        </form>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          Already registered? <Link to="/">Login</Link>
        </p>
      </div>
    </>
  );
}
