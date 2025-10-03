
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const MealCancellation = ({ mealDetails }) => {
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');

  const handleCancellation = async () => {
    const user = supabase.auth.user();
    const mealTime = new Date(mealDetails.meal_date);
    const now = new Date();
    const diff = (mealTime - now) / 1000 / 60 / 60; // Difference in hours

    if (diff < 12) {
      setMessage('Cancellation not allowed within 12 hours.');
      return;
    }

    const { error } = await supabase
      .from('cancellations')
      .insert([{ user_id: user.id, meal_date: mealDetails.meal_date, meal_time: mealDetails.meal_time, status: 'Pending' }]);

    if (error) {
      setMessage('Error submitting cancellation.');
    } else {
      setMessage('Cancellation request submitted successfully.');
    }
  };

  return (
    <div>
      <button onClick={handleCancellation}>Cancel Meal</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MealCancellation;
