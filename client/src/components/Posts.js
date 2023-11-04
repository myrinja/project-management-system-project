import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Post.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(response => {
        setPosts(response.data.posts);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const navigateToPostDetail = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleUpdatePost = (postId) => {
    navigate(`/posts/${postId}/edit`);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      axios.delete(`http://localhost:5000/posts/${postId}`)
        .then(() => {
          setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        })
        .catch(error => {
          console.error('Error deleting post:', error);
        });
    }
  };

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
            {/* <p>Categories: {post.categories.join(', ')}</p> */}
            <button onClick={() => navigateToPostDetail(post.id)}>View</button>
            <button className="update-button" onClick={() => handleUpdatePost(post.id)}>+</button>
            <button className="delete-button" onClick={() => handleDeletePost(post.id)}>-</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
