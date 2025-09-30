import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ProfileSetupPage.css';

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activity: 'sedentary',
    goal: 'maintain',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const calculateMacros = (profile) => {
  //   // Mifflin-St Jeor Equation for BMR
  //   let bmr;
  //   if (profile.gender === 'male') {
  //     bmr = (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) + 5;
  //   } else {
  //     bmr = (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) - 161;
  //   }

  //   // Activity Multiplier
  //   let activityMultiplier;
  //   switch (profile.activity) {
  //     case 'sedentary': activityMultiplier = 1.2; break;
  //     case 'light': activityMultiplier = 1.375; break;
  //     case 'moderate': activityMultiplier = 1.55; break;
  //     case 'active': activityMultiplier = 1.725; break;
  //     case 'very_active': activityMultiplier = 1.9; break;
  //     default: activityMultiplier = 1.2; break;
  //   }

  //   let calories = bmr * activityMultiplier;

  //   // Goal Adjustment
  //   switch (profile.goal) {
  //     case 'lose': calories -= 500; break; // -500 calories for weight loss
  //     case 'gain': calories += 500; break; // +500 calories for weight gain
  //     case 'maintain': break; // No change for maintenance
  //     default: break;
  //   }

  //   // Macro distribution (example percentages)
  //   const protein = (calories * 0.30) / 4; // 30% calories from protein (4 cal/g)
  //   const carbs = (calories * 0.40) / 4;   // 40% calories from carbs (4 cal/g)
  //   const fats = (calories * 0.30) / 9;    // 30% calories from fats (9 cal/g)

  //   return {
  //     calories: Math.round(calories),
  //     protein: Math.round(protein),
  //     carbs: Math.round(carbs),
  //     fats: Math.round(fats),
  //   };
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = {
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      age: parseInt(formData.age),
      gender: formData.gender,
      activity: formData.activity,
      goal: formData.goal,
    };

    axios.post(`http://localhost:3000/profile-setup/${userId}`, profile)
      .then(res => {
        const saved = res.data?.profile;
        if (saved) {
          localStorage.setItem('userProfile', JSON.stringify({
            weight: saved.weight,
            height: saved.height,
            age: saved.age,
            gender: saved.gender,
            activity: saved.activity,
            goal: saved.goal,
          }));
          localStorage.setItem('userMacros', JSON.stringify({
            calories: saved.calories,
            protein: saved.protein,
            carbs: saved.carbs,
            fats: saved.fats,
          }));
        }
        navigate('/');
      })
      .catch(err => {
        console.error('Profile save error:', err.response?.data?.error || err.message);
      });
  };

  return (
    <div className="centered-container">
      <div className="card">
        <div className="avatar-placeholder">
          📝 
        </div>
        <h1>Profile Setup</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <span className="input-icon">⚖️</span>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight (kg)"
              required
            />
          </div>
          <div>
            <span className="input-icon">📏</span>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Height (cm)"
              required
            />
          </div>
          <div>
            <span className="input-icon">🎂</span>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
          </div>
          <div>
            <span className="input-icon">🚻</span>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <span className="input-icon">🏃</span>
            <select
              name="activity"
              value={formData.activity}
              onChange={handleChange}
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Lightly active (light exercise/sports 1-3 days/week)</option>
              <option value="moderate">Moderately active (moderate exercise/sports 3-5 days/week)</option>
              <option value="active">Very active (hard exercise/sports 6-7 days a week)</option>
              <option value="very_active">Extra active (very hard exercise/physical job)</option>
            </select>
          </div>
          <div>
            <span className="input-icon">🎯</span>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
            >
              <option value="lose">Weight Loss</option>
              <option value="maintain">Weight Maintenance</option>
              <option value="gain">Weight Gain</option>
            </select>
          </div>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
