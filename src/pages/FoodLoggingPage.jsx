import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const FoodLoggingPage = () => {

  const navigate = useNavigate();

  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting || cooldown > 0) return;

    setIsSubmitting(true);
    setCooldown(10);

    axios.post("http://localhost:3000/gemini",{food:foodName,gram:quantity})
    .then((response)=>{

    navigate("/")
    
    })
    .finally(() => {
      setIsSubmitting(false);
      const timer = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    })
 
    }
 

  return (
    <div className="centered-container">
      <div className="card">
        <h1>Log Your Food</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Food Name:</label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Quantity (grams):</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isSubmitting || cooldown > 0}>
            {cooldown > 0 ? `Please waite` : 'Log Food'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodLoggingPage;
