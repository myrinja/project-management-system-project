import React, { useState } from 'react';
import { Link} from 'react-router-dom';

function RegistrationForm() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Registered with username:', username);
    history.push('/login');
 };


}

export default RegistrationForm;