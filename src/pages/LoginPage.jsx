import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  // Clear previous errors
    axios.post('http://localhost:3000/login', formData, { withCredentials: true })
      .then(response => {
        const user = response.data?.user;
        const needsProfileSetup = response.data?.needsProfileSetup;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          if (needsProfileSetup) {
            navigate(`/profile-setup/${user.id}`);
          } else {
            navigate(`/?userId=${user.id}`);
          }
          return;
        }
        navigate('/login');
      })
      .catch(error => {
        console.error('Login error:', error.response?.data?.error || error.message);
      });
  };

  return (
    <div className="auth-container">

      <div className="login_auth-card">
        <div className="auth-header">
          <div className="logo">
            <div className="logo-icon">👤</div>
            <h2>GYM-khana</h2>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-form-section">
            <div className="user-avatar">👤</div>



            <form onSubmit={handleSubmit} className="auth-form">
              
              <div className="form-group">
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ border: 'none', outline: 'none', background: 'transparent' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ border: 'none', outline: 'none', background: 'transparent' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn login-btn"
              >
                LOGIN
              </button>
            </form>


            <div className="mobile-auth-links">
              <span>New here? </span>
              <Link to="/register">Sign up</Link>
            </div>
          </div>

          <div className="auth-welcome-section">
            <div className="welcome-graphic"></div>
            <h1 className="welcome-title">Welcome.</h1>
            <p className="welcome-text">
              Sign in to access your account and manage your profile. Stay
              connected with the latest updates and opportunities.
            </p>
            <div className="signup-link">
              <span>New here? </span>
              <Link to="/register">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
