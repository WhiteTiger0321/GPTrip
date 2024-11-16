// ProcessContext.js
import React, { createContext, useState } from 'react';

export const ProcessContext = createContext();

export const ProcessProvider = ({ children }) => {
  const [usedActivities, setUsedActivities] = useState([]); // 사용된 일정 저장

  return (
    <ProcessContext.Provider value={{ usedActivities, setUsedActivities }}>
      {children}
    </ProcessContext.Provider>
  );
};
