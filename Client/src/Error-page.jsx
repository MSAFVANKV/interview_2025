import React from 'react';
import { useNavigate } from 'react-router';


function ErrorPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <p className="error-message">Oops! The page you are looking for doesn't exist.</p>
        <button className="go-home-button" onClick={handleGoHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
