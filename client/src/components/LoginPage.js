import React, { useState } from 'react';

function LoginPage() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Logged in with username:', username);
    history.push('/');
 };

 
}

export default LoginPage;