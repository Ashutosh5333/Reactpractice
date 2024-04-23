import React, { useState } from 'react';
import './tic.css';

const MachineTick = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState(true); 
  
  const handleClick = (index) => {
    if (winner || board[index]) {
      return;
    }
     let newboard =[...board]
     newboard[index] = nextPlayer ? "x":"o"
    setBoard(newboard)
    setNextPlayer(!nextPlayer)
  };

  const buttonSquare = (index) => (
    <button className='square' onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const findWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };
  const winner = findWinner(board);

  const status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer ? 'X' : 'O'}`;

  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {buttonSquare(0)}
        {buttonSquare(1)}
        {buttonSquare(2)}
      </div>
      <div className='board-row'>
        {buttonSquare(3)}
        {buttonSquare(4)}
        {buttonSquare(5)}
      </div>
      <div className='board-row'>
        {buttonSquare(6)}
        {buttonSquare(7)}
        {buttonSquare(8)}
      </div>
    </div>
  );
};

export default MachineTick;
