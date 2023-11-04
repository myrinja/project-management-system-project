import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ EditPost.css';

const EditPost = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    image_url: '',
  });

  const { post_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${post_id}`)
      .then(response => {
        setPost(response.data.post);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [post_id]);

  const handleUpdatePost = () => {
    axios
      .put(`http://localhost:5000/posts/${post_id}`, post)
      .then(() => {
        navigate(`/posts/${post_id}`);
      })
      .catch(error => {
        console.error('Error updating post:', error);
      });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  return (
    <div className="form-container">
      <h1>Edit Post</h1>
      <div className="form-group">
        <label>Title:</label>
        <input type="text" name="title" value={post.title} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Content:</label>
        <textarea name="content" value={post.content} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Image URL:</label>
        <input type="text" name="image_url" value={post.image_url} onChange={handleInputChange} />
      </div>
      <button onClick={handleUpdatePost}>Update Post</button>
    </div>
  );
};

export default EditPost;
