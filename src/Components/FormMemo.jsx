import React, { useState, useMemo } from 'react';

const CounterApp = () => {
  const [counter, setCounter] = useState(0);
  const [sub,SetSub] = useState(100)
  // Memoize the squared value of the counter

  // const squaredValue = () => {
  //     console.log('Calculating squared value...'); 
  //     return counter ** 2;
  //   };
  
  const squaredValue = useMemo(() => {
    console.log('Calculating squared value...');
    return counter ** 2;
  }, [counter]);

  //  console.log("counter",counter)
  //  performance inhance karne ke liye use hota 
  //  useMemo() returns a memoized value. This means that React will only re-evaluate
  //  the value if the dependencies array changes. This can be useful for values 
  //  that are expensive to compute, as it can prevent React from re-rendering the
  //  component unnecessarily.

  return (
    <div>
      <h1>Counter App</h1>
      <p>Counter: {counter}</p>
      <p>Squared Value: {squaredValue}</p>
      {/* <p>Squared Value: {squaredValue()}</p> */}

      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)} disabled={counter === 0}>
        Decrement
      </button>
     
       <h1> Substraion {sub} </h1>
       <button onClick={() => SetSub(sub - 1)} >
          Subtract
      </button>

    </div>
  );
};

export default CounterApp;
