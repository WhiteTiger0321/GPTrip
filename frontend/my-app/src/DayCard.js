import React from 'react';

function DayCard({ image, time, title }) {
  return (
    <div className="day-card">
      <img src={image} alt={title} className="day-card-image" />
      <div className="day-card-content">
        <p className="time">{time}</p>
        <p className="title">{title}</p>
      </div>
    </div>
  );
}

export default DayCard;
