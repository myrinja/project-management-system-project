import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Post.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(response => {
        setPosts(response.data.posts);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div className="posts-container">
      <h1>Posts</h1>
      <div className="post-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <img src={post.image_url} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Categories: {post.categories.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
