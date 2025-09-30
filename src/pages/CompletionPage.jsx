import React from 'react';
import { Link } from 'react-router-dom';
import './CompletionPage.css';

const CompletionPage = () => {
  return (
    <div className="centered-container">
      <div className="card">
        <h1 className="completion-message">✅ Today Completed!</h1>
        <p className="completion-text">You've met all your macro targets for today. Great job!</p>
        <Link
          to="/"
          className="button-style"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default CompletionPage;
