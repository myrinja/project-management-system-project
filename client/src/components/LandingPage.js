import React from 'react';
import backgroundImage from '../images/background.jpg';


const LandingPage = () => {
  const containerStyle = {
    margin: 0,
    padding: 0,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', 
    
    
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Add a semi-transparent white background for better readability
  };

  return (
    <div style={containerStyle}>
    <div style={contentStyle}>
    
    <div className="container text-center mt-5" >
      <h1 className="display-4">Welcome to My Blog</h1>
      <p className="lead">Explore the latest posts and share your thoughts.</p>
    </div>
    </div>
    </div>
  );
};

export default LandingPage;
