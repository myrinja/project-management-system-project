import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Blog from './components/Blog';
import RegistrationForm from './components/RegistrationForm';
import LoginPage from './components/LoginPage';

import Navbar  from './components/Navbar';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/blog" element={<Blog />}  />
          <Route path="/registrationpage" element={<RegistrationForm />} />
          <Route path="/loginpage" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
