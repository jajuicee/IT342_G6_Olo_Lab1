import React, { useState } from 'react';
import { register } from '../services/api';

const Register = ({ onBackToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    role: 'USER'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("Registration successful! You can now log in.");
      onBackToLogin();
    } catch (err) {
      alert(err.response?.data || "Registration failed.");
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" required
          onChange={(e) => setFormData({...formData, firstname: e.target.value})} />
        <input type="text" placeholder="Last Name" required
          onChange={(e) => setFormData({...formData, lastname: e.target.value})} />
        <input type="email" placeholder="Email" required
          onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" required
          onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <button type="submit">Sign Up</button>
      </form>
      <button className="back-btn" onClick={onBackToLogin}>Back to Login</button>
    </div>
  );
};

export default Register;