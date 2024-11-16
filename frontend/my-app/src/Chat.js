import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const handleSend = () => {
    // 피드백을 설정하는 로직
    setFeedback(`Feedback: ${message}`);
    setMessage('');  // 메시지 입력창 비우기
  };

  const goBack = () => {
    navigate(-1);  // 이전 페이지로 돌아가기
  };

  return (
    <div>
      <header>
        <button onClick={goBack} className="back-button">Back</button>
      </header>
      <div className="chat-container">
        <h1>Chat with Us</h1>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="chat-input"
        />
        <button onClick={handleSend} className="send-button">Send</button>
        {feedback && <div className="feedback">{feedback}</div>}
      </div>
    </div>
  );
}

export default Chat;
