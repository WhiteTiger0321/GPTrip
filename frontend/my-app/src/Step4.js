// Step4.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import activityList from './activityData'; // 데이터 가져오기
import './Step4.css';

function Step4() {
  const navigate = useNavigate();

  // 각 카드의 현재 인덱스와 잠금 상태를 관리
  const [currentIndexes, setCurrentIndexes] = useState(Array(activityList.length).fill(0));
  const [lockedCards, setLockedCards] = useState(Array(activityList.length).fill(false));

  const handleRefresh = () => {
    // 각 카드별로 잠금되지 않은 경우에만 갱신
    setCurrentIndexes((prevIndexes) =>
      prevIndexes.map((index, i) => (lockedCards[i] ? index : (index + 1) % activityList.length))
    );
  };

  const toggleLock = (index) => {
    setLockedCards((prevLocks) =>
      prevLocks.map((locked, i) => (i === index ? !locked : locked))
    );
  };

  const handleConfirm = () => {
    navigate('/step5'); // Step5 페이지로 이동
  };

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 돌아감
  };

  const handleChat = () => {
    navigate('/chat'); //chat 페이지로 이동
  };

  return (
    <div className="app">
      <header className="header">
        <button className="back-button" onClick={handleBack}>&lt;</button>
        <h2>Day 4</h2>
        <button className="chat-button" onClick={handleChat}>&#9993;</button>
      </header>

      <div className="day-cards">
        {currentIndexes.map((currentIndex, i) => (
          <div key={i} className="card">
            <img src={activityList[currentIndex].image} alt={activityList[currentIndex].title} className="card-image" />
            <div className="card-info">
              <p className="time">{activityList[currentIndex].time}</p>
              <h3>{activityList[currentIndex].title}</h3>
            </div>
            <button
              className={`lock-button ${lockedCards[i] ? 'locked' : ''}`}
              onClick={() => toggleLock(i)}
            >
              {lockedCards[i] ? '🔒' : '🔓'}
            </button>
          </div>
        ))}
      </div>

      <div className="footer">
        <button className="button cancel-button" onClick={handleRefresh}>갱신</button>
        <button className="button confirm-button" onClick={handleConfirm}>확정</button>
      </div>
    </div>
  );
}

export default Step4;
