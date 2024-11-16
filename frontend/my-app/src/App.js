import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProcessProvider } from './ProcessContext';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Chat from './Chat';
import Result1 from './Result1';
import DetailPage from './DetailPage';

function App() {
  return (
    <ProcessProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Step1 />} />
          <Route path="/step2" element={<Step2 />} />
          <Route path="/step3" element={<Step3 />} />
          <Route path="/step4" element={<Step4 />} />
          <Route path="/step5" element={<Step5 />} />
          <Route path="/step6" element={<Step6 />} />
          <Route path="/step7" element={<Step7 />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Result1" element={<Result1 />} />
          <Route path="/DetailPage" element={<DetailPage />} />
        </Routes>
      </Router>
    </ProcessProvider>
  );
}

export default App;

