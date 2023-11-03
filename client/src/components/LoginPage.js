import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './LoginPage.module.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 200) {
        alert('You were logged in successfully!');
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('username', username);
        navigate('/'); // Use navigate to redirect to the home page
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('API request failed:', error);
    }
  };

  return (
    <div className={styles.loginPage}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;