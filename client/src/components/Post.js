import React from 'react';

const Post = ({ post, onDelete }) => {
  return (
    <div className="card mb-3">
      {post.image && (
        <img src={URL.createObjectURL(post.image)} className="card-img-top" alt="Post" />
      )}
      <div className="card-body">
        <h5 className="card-title">{post.name}</h5>
        <p className="card-text">{post.description}</p>
        <button onClick={() => onDelete(post)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
