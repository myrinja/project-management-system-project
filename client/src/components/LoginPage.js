import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log in the user with the backend API.
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

    // Check if the login was successful.
    if (response.status === 200) {
      // Show an alert to the user that they were logged in successfully.
      alert('You were logged in successfully!');

      // Store the user's login information in local storage.
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('username', username);

      // Redirect the user to the home page.
      window.location.href = '/';
    } else {
      // Show an alert to the user that their login failed.
      alert('There was an error logging you in. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default LoginPage;
