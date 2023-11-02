import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
// import Blog from './components/Blog';
import RegistrationForm from './components/RegistrationForm';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import PostForm from './components/PostForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/postform" element={<PostForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
