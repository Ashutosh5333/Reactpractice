import React, { useState } from "react";

const CounterExample = () => {
  const [count, setCount] = useState(0);

  // ❌ Not safe for multiple updates
  const handleBrokenIncrement = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  // ✅ Correct functional way
  const handleProperIncrement = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Count: {count}</h2>

      <button onClick={handleBrokenIncrement} style={{ marginRight: "10px" }}>
        ❌ setState(count + 1) x3
      </button>

      <button onClick={handleProperIncrement}>
        {/* ✅ setState(prev => prev + 1) x3 */}
           second proper
      </button>
    </div>
  );
};

export default CounterExample;
