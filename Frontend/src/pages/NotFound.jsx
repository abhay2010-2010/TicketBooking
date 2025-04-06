import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div>
          <h2 className="not-found-title">
            404 - Page Not Found
          </h2>
          <div className="not-found-icon-wrapper">
            <svg 
              className="not-found-icon" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <p className="not-found-message">
            Oops! The page you are looking for might have been removed or is temporarily unavailable.
          </p>
        </div>
        <div className="not-found-button-container">
          <Link 
            to="/" 
            className="not-found-home-button"
          >
            Return to Home
          </Link>
        </div>
        <div className="not-found-support-text">
          <p className="not-found-support-message">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;