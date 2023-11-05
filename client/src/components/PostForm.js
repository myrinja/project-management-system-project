import React, { useState } from 'react';
import axios from 'axios';
import './PostForm.css';
import { useNavigate } from 'react-router-dom'; 

function PostForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    user_id: 1,
    image_url: '',
  });

  const [isPostCreated, setIsPostCreated] = useState(false);
  
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://127.0.0.1:5000/posts', formData)
      .then((response) => {
        setIsPostCreated(true);
        navigate('/posts'); // Redirect to the posts page
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        setIsPostCreated(false);
      });
  };

  return (
    <div className="post-form-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
        {isPostCreated && <p>Post created successfully</p>}
      </form>
    </div>
  );
}

export default PostForm;
