import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RegistrationForm.module.css';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Register the user with the backend API.
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // Check if the registration was successful.
    if (response.status === 200) {
      // Show an alert to the user that their account was created successfully.
      alert('Your account was created successfully!');

      // Redirect the user to the login page.
      window.location.href = '/login';
    } else {
      // Show an alert to the user that their account creation failed.
      alert('There was an error creating your account. Please try again later.');
    }
  };

  return (
    <div className={styles.registrationForm}>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default RegistrationForm;