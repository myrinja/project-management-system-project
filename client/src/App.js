import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import EditPost from './components/ EditPost';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/postform" element={<PostForm />} />
          <Route path="/posts/:post_id" element={<PostDetail />} />
          <Route path="/posts/:post_id/edit" element={<EditPost />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;