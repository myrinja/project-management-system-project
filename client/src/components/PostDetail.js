import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${postId}`)
      .then(response => {
        setPost(response.data.post);
      })
      .catch(error => {
        console.error('Error fetching post details:', error);
      });
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-detail">
      <h2>{post.title}</h2>
      <img src={post.image_url} alt={post.title} />
      <p>{post.content}</p>
      <p>Author: {post.author}</p>
      <p>Categories: {post.categories.join(', ')}</p>
    </div>
  );
};

export default PostDetail;
