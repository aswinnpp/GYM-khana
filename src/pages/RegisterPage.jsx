import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  // For toggling password visibility



  const handleSubmit = (e) => {
    e.preventDefault(); // stop th
    // loge page from reloading

    console.log(formData);

    axios.post('http://localhost:3000/register', formData, { withCredentials: true })
      .then(response => {
        alert('Registration successful! Please log in.');
        navigate('/login');
      })
      .catch(error => console.log(error));
  };


  return (
    <div className="auth-container">

      <div className="register_auth-card">
        <div className="auth-header">
          <div className="logo">
            <div className="logo-icon">✅</div>
            <h2>GYM-khana</h2>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-form-section">




            <form
              onSubmit={handleSubmit}
              className="auth-form"
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}
            >
              {/* Full Name */}
              <div className="form-group" style={{ flex: '1 1 200px' }}>
                <div className="input-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    name="username"
                    placeholder="Full Name"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent' }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group" style={{ flex: '1 1 200px' }}>
                <div className="input-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent' }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group" style={{ flex: '1 1 200px' }}>
                <div className="input-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent' }}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="form-group" style={{ flex: '1 1 200px' }}>
                <div className="input-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent' }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn register-btn"
                style={{ flex: '0 0 auto', padding: '10px 20px' }}
              >
                REGISTER
              </button>
            </form>


            <div className="mobile-auth-links">
              <span>Already have an account? </span>
              <Link to="/login">Sign in</Link>
            </div>
          </div>

          <div className="auth-welcome-section">
            <div className="welcome-graphic"></div>
            <h1 className="welcome-title">Join Us.</h1>
            <p className="welcome-text">
              Create your account to get started. Join our community and
              discover amazing opportunities that await you.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Free account creation</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Secure authentication</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>24/7 support</span>
              </div>
              <div className="login-link">
                <span>Already have an account? </span>
                <Link to="/login">Sign in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
