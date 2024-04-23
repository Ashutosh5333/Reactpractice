import React, { useRef, useState } from 'react';

const Game = () => {
  const [count, setCount] = useState(0);
  const [pause, setpause] = useState(false);
  const [data,SetData] = useState(Array(9).fill(""));
  const titleRef = useRef(null);

  const playgame = (e, num) => {
    if (pause) {
      return;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `X`;
      data[num] = "X";
      setCount(prevCount => prevCount + 1);
    } else {
      e.target.innerHTML = `O`;
      data[num] = "O";
      setCount(prevCount => prevCount + 1);
    }
    checkwin();
  };

  const checkwin = () => {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (data[a] && data[a] === data[b] && data[a] === data[c]) {
          winner(data[a]);
        }
      }
  };

  const winner = (winner) => {
    setpause(true);
    if (winner === "X") {
      titleRef.current.innerHTML = "Congratulations: X";
    } else {
      titleRef.current.innerHTML = "Congratulations: O";
    }
  };

  return (
    <div className='container'>
      <h2 ref={titleRef}>Tic Tac Toe</h2>
       
       <div className='con1 d-flex p-2 w-50 border gap-5 border-1'>
        {data.slice(0, 3).map((value, index) => (
          <div key={index} className='box1 border gap-5 border-1 p-2' onClick={(e) => playgame(e,index)}>{value}</div>
        ))}
      </div>
      <div className='con2 d-flex p-2 w-50 border gap-5 border-1'>
        {data.slice(3, 6).map((value, index) => (
          <div key={index + 3} className='box1 border gap-5 border-1 p-2' onClick={(e) => playgame(e,index + 3)}>{value}</div>
        ))}
      </div>
      <div className='con3 d-flex p-2 w-50 border gap-5 border-1'>
        {data.slice(6, 9).map((value, index) => (
          <div key={index + 6} className='box1 border gap-5 border-1 p-2' onClick={(e) => playgame(e,index + 6)}>{value}</div>
        ))}
      </div>

      <button>Reset Game</button>
    </div>
  );
};

export default Game;
