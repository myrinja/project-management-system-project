import React from 'react';

const About = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2 className="mt-5">About Post Haven</h2>
          <p>
            Welcome to my blog! This is a platform where I share my thoughts, experiences, and stories.
          </p>
          <p>
            Feel free to explore the various posts and share your thoughts in the comments.
            Post Haven is the place to be.
          </p>
          <p>
            If you have any questions or suggestions, don't hesitate to <a href="/contact">contact me</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
