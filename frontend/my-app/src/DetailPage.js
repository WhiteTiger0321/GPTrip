import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DetailPage.css';

function DetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const activity = location.state;  // Step1에서 전달된 activity 정보

  const handleBack = () => {
    navigate(-1);  // 이전 페이지로 돌아가기
  };

  return (
    <div className="detail-page">
      <header className="header">
        <button className="back-button" onClick={handleBack}>⟨ 돌아가기</button>
        <h2>상세 정보</h2>
      </header>

      <div className="detail-container">
        <div className="image-container">
          <img src={activity.image} alt={activity.title} className="detail-image" />
        </div>
        <div className="detail-info">
          <h3>{activity.title}</h3>
          <p><strong>시간:</strong> {activity.time}</p>
          <p><strong>설명:</strong> 이 일정은 {activity.title}에 관한 상세 내용입니다. 일정에 대한 추가 설명이 필요할 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
