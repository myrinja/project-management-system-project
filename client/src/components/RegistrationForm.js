import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationForm.css';
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://127.0.0.1:5000/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 201) {
          setSuccess('Registration successful! You can now log in.');
          setError(null);
        } else if (response.status === 401) {
          setError('Invalid email or password. Please check your input.');
          setSuccess(null);
        } else {
          setError('An error occurred. Please try again later.');
          setSuccess(null);
        }
      });
  };

  return (
    <div className="registration-form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
        <p>
          Don't have an account? <Link to="/login" className="registration-link">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
