import React, { useRef, useState } from 'react';

const data = ["", "", "", "", "", "", "", "", ""];

const Game = () => {
  const [count, setCount] = useState(0);
  const [pause, setpause] = useState(false);
//   const [data,SetData] = useState(Array(9).fill)
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
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      winner(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      winner(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      winner(data[8]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      winner(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      winner(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      winner(data[8]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      winner(data[8]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      winner(data[6]);
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
        <div className='box1 border gap-5 border-1 p-2' onClick={(e) => { playgame(e, 0) }}>1</div>
        <div className='box1 border gap-5 border-1 p-2' onClick={(e) => { playgame(e, 1) }}>2</div>
        <div className='box1 border gap-5 border-1 p-2' onClick={(e) => { playgame(e, 2) }}>3</div>
      </div>
      <div className='con2 d-flex p-2 w-50 border gap-5 border-1'>
        <div className='box1 border gap-5 border-1 p-2' onClick={(e) => { playgame(e, 3) }}>4</div>
        <div className='box1 border gap-5 border-1 p-2' onClick={(e) => { playgame(e, 4) }}>5</div>
        <div className='box1 border gap-5 border-1 p-2' onClick={(e) => { playgame(e, 5) }}>6</div>
      </div>
      <div className='con3 d-flex p-2 w-50 border gap-5 border-1'>
        <div className='box1 border gap-5 border-1 p-2' onClick={(e) => { playgame(e, 6) }}>7</div>
        <div className='box1 border gap-5 border-1 p-2' onClick={(e) => { playgame(e, 7) }}>8</div>
        <div className='box1 border gap-5 border-1 p-2' onClick={(e) => { playgame(e, 8) }}>9</div>
      </div>

      <button>Reset Game</button>
    </div>
  );
};

export default Game;
