import React, { useState } from 'react';
import PostForm from './PostForm';
import Post from './Post';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handleDeletePost = (postToDelete) => {
    const updatedPosts = posts.filter((post) => post !== postToDelete);
    setPosts(updatedPosts);
  };

  return (
    <div className="container">
      <PostForm onPostSubmit={handlePostSubmit} />
      {posts.map((post, index) => (
        <Post key={index} post={post} onDelete={handleDeletePost} />
      ))}
    </div>
  );
};

export default Blog;
