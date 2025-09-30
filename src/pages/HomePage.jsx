import React, { useState, useEffect } from 'react';
import { Link, useNavigate ,useLocation  } from 'react-router-dom';
import './HomePage.css';
import axios from 'axios';
const MacroProgressBar = ({ label, current, target }) => {
  const safeCurrent = Math.max(0, Number(current) || 0);
  const safeTarget = Math.max(0, Number(target) || 0);
  const percentage = safeTarget > 0 ? (safeCurrent / safeTarget) * 100 : 0;
  const displayPercentage = Math.min(100, Math.max(0, percentage)).toFixed(0);
  const isComplete = percentage >= 100;
  const labelStyle = { color: isComplete ? 'green' : 'red' };
  const unit = label === 'Electrolytes' ? ' mg' : (label === 'Water' ? ' ml' : ' g');

  return (
    <div className="macro-progress-bar">
      <div className="macro-progress-label" style={labelStyle}>
        <span>{label}:</span>
        <span>{safeCurrent}/{safeTarget}{unit} ({displayPercentage}%)</span>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%`, backgroundColor: isComplete ? 'green' : 'red' }}
        ></div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const userId = queryParams.get("userId");


  const [profile, setProfile] = useState(null);
  const [macros, setMacros] = useState(null);
  const [dailyTotals, setDailyTotals] = useState({
    proteinConsumed: 0,
    carbsConsumed: 0,
    fatsConsumed: 0,
    electrolytesConsumed: 0,
    waterConsumed: 0
  });

  useEffect(() => {
    if (!userId) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser?.id) {
        navigate(`/?userId=${storedUser.id}`);
      } else {
        navigate('/login');
      }
      return;
    }

    axios.post("http://localhost:3000/homeSetup", { user: userId }, { withCredentials: true })
      .then((response) => {
        const data = response.data || {};
        if (data.profile) setProfile(data.profile);
        if (data.macros) setMacros(data.macros);
        if (data.dailyTotals) setDailyTotals(data.dailyTotals);
      })
      .catch((err) => {
        console.error('Home fetch error:', err.response?.data?.error || err.message);
      });
  }, [userId, navigate]);

  if (!profile || !macros) {
    return (
      <div className="centered-container">
        <div className="card">
          <p className="error-message">Loading profile data or please complete your profile information.</p>
          <Link to="/login" className="link-style">
            Go to Login/Signup
          </Link>
        </div>
      </div>
    );
  }

  if (!profile || !macros) {
    return (
      <div className="centered-container">
        <div className="card">
          <p className="error-message">Loading profile data or please complete your profile information.</p>
          <Link to="/login" className="link-style">
            Go to Login/Signup
          </Link>
        </div>
      </div>
    );
  }

  const consumedProtein = dailyTotals.proteinConsumed;
  const consumedCarbs = dailyTotals.carbsConsumed;
  const consumedFats = dailyTotals.fatsConsumed;
  const consumedElectrolytes = dailyTotals.electrolytesConsumed;
  const consumedWater = dailyTotals.waterConsumed;

  return (
    <div className="container">
      <div className="card">
        <h1>Dashboard</h1>

        <div className="profile-macros-grid">
          <div>
            <h2>Your Profile</h2>
            <p><strong>Weight:</strong> {parseFloat(profile.weight).toFixed(0)} kg</p>
            <p><strong>Height:</strong> {parseFloat(profile.height).toFixed(0)} cm</p>
            <p><strong>Age:</strong> {parseFloat(profile.age).toFixed(0)} years</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Activity:</strong> {profile.activity}</p>
            <p><strong>Goal:</strong> {profile.goal}</p>
          </div>
          <div>
            <h2>Daily Targets</h2>
            <p><strong>Protein:</strong> {parseFloat(macros.protein).toFixed(0)} g</p>
            <p><strong>Carbohydrates:</strong> {parseFloat(macros.carbs).toFixed(0)} g</p>
            <p><strong>Healthy Fats:</strong> {parseFloat(macros.fats).toFixed(0)} g</p>
            <p><strong>Electrolytes:</strong> {parseFloat(macros.electrolytes).toFixed(0)} mg</p>
            <p><strong>Water:</strong> {parseFloat(macros.water).toFixed(0)} ml</p>
          </div>
        </div>

        <h2 style={{color:'black'}}>Today's Progress</h2>
        <MacroProgressBar label="Protein" current={parseFloat(consumedProtein).toFixed(2)} target={parseFloat(macros.protein).toFixed(2)} />
        <MacroProgressBar label="Carbohydrates" current={parseFloat(consumedCarbs).toFixed(2)} target={parseFloat(macros.carbs).toFixed(2)} />
        <MacroProgressBar label="Healthy Fats" current={parseFloat(consumedFats).toFixed(2)} target={parseFloat(macros.fats).toFixed(2)} />
        <MacroProgressBar label="Electrolytes" current={parseFloat(consumedElectrolytes).toFixed(0)} target={parseFloat(macros.electrolytes).toFixed(0)} />
        <MacroProgressBar label="Water" current={parseFloat(consumedWater).toFixed(0)} target={parseFloat(macros.water).toFixed(0)} />

        <div className="button-group">
          <Link
            to="/food-log"
            className="button-style"
          >
            Log Food
          </Link>
           {consumedProtein >= macros.protein && consumedCarbs >= macros.carbs && consumedFats >= macros.fats && consumedElectrolytes >= macros.electrolytes && consumedWater >= macros.water && (
            <Link
              to="/completed"
              className="button-style"
            >
              Today Completed!
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
