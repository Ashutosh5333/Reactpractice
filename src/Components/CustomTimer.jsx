import React, { useState, useRef } from 'react';

const CustomTimer = () => {
  const [time, setTime] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!timerActive && time !== '') {
      const selectedTime = new Date(time).getTime();
      const currentTime = new Date().getTime();
      const countdown = Math.max(0,
         Math.floor((selectedTime - currentTime) / 1000));
        //  console.log("countdwon",countdown)

      setSeconds(countdown);
      setTimerActive(true);

      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            clearInterval(intervalRef.current);
            setTimerActive(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
  } ;

  //  console.log("timerr", seconds)
  
  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTimerActive(false);
    setSeconds(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:
    ${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      {!timerActive ? (
        <button onClick={startTimer}>Start Timer</button>
      ) : (
        <button onClick={stopTimer}>Stop Timer</button>
      )}

      {timerActive && (
        <div>
          <p>Time Remaining: {formatTime(seconds)}</p>
          <div style={{ width: '300px', height: '20px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '10px' }}>
            <div
              style={{
                width: `${(seconds / parseInt(time)) * 100}%`,
                height: '100%',
                backgroundColor: 'blue',
                borderRadius: '4px',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTimer;
