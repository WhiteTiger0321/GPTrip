import React, { useState } from "react";

function Blocks() {
  const initialBlocks = Array.from({ length: 5 }, (_, i) => ({
    text: `블록 ${i + 1}`,
    backgroundColor: '#ffffff',
  }));

  const [blocks, setBlocks] = useState(initialBlocks);

  const refreshBlocks = () => {
    const updatedBlocks = blocks.map((block) => ({
      ...block,
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }));
    setBlocks(updatedBlocks);
  };

  return (
    <div>
      <button onClick={refreshBlocks}>갱신</button>
      {blocks.map((block) => (
        <div style={{ backgroundColor: block.backgroundColor }}>
          {block.text}
        </div>
      ))}
    </div>
  );
}

export default Blocks; 