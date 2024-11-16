import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import activityList from './activityData'; // 데이터 가져오기
import './Step1.css';

// 시간 문자열을 24시간 형식의 정수로 변환하는 함수
const parseTimeRange = (timeString) => {
  const [startTime, endTime] = timeString.split(" - ");
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);
  return {
    start: startHours * 100 + startMinutes,
    end: endHours * 100 + endMinutes,
  };
};

// 일정 배열을 반환하는 함수
const fillSchedule = (activities, lockedCards) => {
  const schedule = [];
  const usedIndexes = new Set();
  let currentTime = 600; // 6:00
  const minActivities = 4; // 최소 4개 일정 카드

  // 1. 잠금된 일정 먼저 처리
  const lockedActivities = activities.filter((activity, index) => lockedCards[index]);
  const nonLockedActivities = activities.filter((activity, index) => !lockedCards[index]);

  // 2. 잠금된 일정 배치 (겹침을 방지하기 위해 시간 우선순위)
  lockedActivities.forEach((activity) => {
    schedule.push(activity);
    usedIndexes.add(activities.indexOf(activity));
  });

  // 3. 잠금되지 않은 일정 배치 (시간 순으로 배치)
  while (schedule.length < minActivities && currentTime < 2300) { // 23:00까지
    const availableActivities = nonLockedActivities.filter((activity, index) => {
      const { start, end } = parseTimeRange(activity.time);

      // 시작 시간 6:00 이전, 종료 시간이 23:00 이후, 종료 시간이 600 미만인 일정 제외
      if (start < 600 || end > 2300 || end < 600) {
        return false;
      }

      // 잠금된 일정과 시간 겹치지 않는지 확인
      const isOverlappingWithLocked = lockedActivities.some((lockedActivity) => {
        const { start: lockedStart, end: lockedEnd } = parseTimeRange(lockedActivity.time);
        return (start < lockedEnd && end > lockedStart); // 시간 겹치는지 체크
      });

      // 시간 겹치지 않도록 필터링
      const isOverlappingWithExisting = [...schedule, ...lockedActivities].some((existingActivity) => {
        const { start: existingStart, end: existingEnd } = parseTimeRange(existingActivity.time);
        return (start < existingEnd && end > existingStart); // 시간 겹치는지 체크
      });

      // 잠금되지 않은 일정끼리도 시간이 겹치지 않도록 필터링
      return !isOverlappingWithLocked && !isOverlappingWithExisting && start >= currentTime && !usedIndexes.has(index);
    });

    if (availableActivities.length === 0) {
      // 더 이상 추가할 일정이 없으면 종료
      break;
    }

    const nextActivity = availableActivities[Math.floor(Math.random() * availableActivities.length)];
    const { end } = parseTimeRange(nextActivity.time);

    schedule.push(nextActivity);
    usedIndexes.add(activities.indexOf(nextActivity));
    currentTime = end;
  }

  // 4. 시간 순으로 정렬 (정렬할 때 모든 일정이 포함되도록 처리)
  const sortedSchedule = [...schedule].sort((a, b) => parseTimeRange(a.time).start - parseTimeRange(b.time).start);

  // 5. 최소 4개 일정이 보이도록 처리
  return sortedSchedule.slice(0, Math.max(minActivities, sortedSchedule.length)); // 최소 4개 일정
};

function Step1() {
  const navigate = useNavigate();
  const [currentSchedule, setCurrentSchedule] = useState(fillSchedule(activityList, [])); // 초기화
  const [lockedCards, setLockedCards] = useState(Array(currentSchedule.length).fill(false)); // 잠금 상태 유지

  const handleRefresh = () => {
    setCurrentSchedule((prevSchedule) => {
      // 잠금된 일정 인덱스를 추출하여 제외된 인덱스 목록을 만들기
      const excludedIndexes = lockedCards
        .map((locked, index) => (locked ? index : null))
        .filter((index) => index !== null);

      // 새로 갱신된 일정
      const updatedSchedule = fillSchedule(activityList, lockedCards);

      // 기존 lockedCards 상태에 따라 업데이트
      const updatedLockedCards = new Array(updatedSchedule.length).fill(false);
      
      // 잠금된 일정이 있다면 그대로 복원
      updatedSchedule.forEach((activity, index) => {
        if (lockedCards[index]) {
          updatedSchedule[index] = prevSchedule[index]; // 기존 일정의 내용으로 교체
          updatedLockedCards[index] = true; // 잠금 상태 유지
        }
      });

      return updatedSchedule.map((activity, index) => ({
        ...activity,
        locked: updatedLockedCards[index], // 새로 갱신된 일정의 locked 상태를 업데이트
      }));
    });
  };

  const toggleLock = (index) => {
    setLockedCards((prevLocks) =>
      prevLocks.map((locked, i) => (i === index ? !locked : locked))
    );
  };

  const handleCardClick = (activity) => {
    navigate('/detailPage', { state: activity });  // 상세 페이지로 이동하면서 activity 데이터를 전달
  };

  const handleConfirm = () => {
    navigate('/step2');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const goToChat = () => {
    navigate('/chat');  // /chat 경로로 이동
  };

  return (
    <div className="app">
      <header className="header">
        <button className="back-button" onClick={handleBack}>&lt;</button>
        <h2>Day 1</h2>
        <button className="chat-button" onClick={goToChat}>Chat</button> {/* Chat 페이지로 이동 */}
      </header>

      <div className="day-cards">
        {currentSchedule.map((activity, i) => (
          <div key={i} className="card">
            <div className="image-box" onClick={() => handleCardClick(activity)}>
              <img src={activity.image} alt={activity.title} className="card-image" />
            </div>
            <div className="card-info">
              <p className="time">{activity.time}</p>
              <h3>{activity.title}</h3>
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

export default Step1;
