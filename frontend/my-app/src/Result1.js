import React, { useContext } from 'react';
import { ProcessContext } from './ProcessContext';

function Result1() {
  const { formData } = useContext(ProcessContext);

  return (
    <div>
      <h2>Review and Submit</h2>
      <p><strong>Step 1 Data:</strong> {formData.step1Data}</p>
      <p><strong>Step 2 Data:</strong> {formData.step2Data}</p>
      <button onClick={() => alert('Submitted!')}>Submit</button>
    </div>
  );
}

export default Result1;