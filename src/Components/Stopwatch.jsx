import React, { useState, useEffect } from "react";

function Stopwatch() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(10);

  // useEffect(() => {
  //   let intervalId;
  //   if (isRunning) {
  //     intervalId = setInterval(() => {
  //       setTimer((prevTimer) => prevTimer + 1);
  //     }, 1000);
  //   } else {
  //     clearInterval(intervalId);
  //   }
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    setTimer(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  //  Timer only

  useEffect(() => {
    let intervalid;
    if (isRunning) {
       intervalid =setInterval(() => {
        // setCount(count - 1);
          setCount((prev) =>{
            if (count === 1) {
              setIsRunning(false);
            }
            return prev - 1;
          })
      }, 1000);
    }
    // else{
    //   clearInterval(intervalid)
    // }
    return () => {
      clearInterval(intervalid);
    };
  }, [isRunning ,count]);

  // console.log(isRunning,"isRunning")
  

  return (
    <div>
      <h2> Timer:{count} </h2>
      <button onClick={() => setIsRunning(true)}> Start Timer </button>

      {/* <h1>Stopwatch</h1> */}
      {/* <p>{formatTime(timer)}</p>
      <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={handleReset}>Reset</button> */}
    </div>
  );
}

export default Stopwatch;
