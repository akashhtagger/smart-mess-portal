import { useState, useEffect } from 'react';

const LeftPanel = ({ userName, mealDetails }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="left-panel">
      <h2>V&A Panel</h2>
      <p>Hi {userName}</p>
      <p>{time.toLocaleString()}</p>
      <h3>Current Menu</h3>
      <p>{mealDetails?.description || 'No meal scheduled'}</p>
    </div>
  );
};

export default LeftPanel;
