import React, { useState } from 'react';
import Tiktacwinner from './Tiktacwinner';
import './tick.css'; 


const initialBoard = Array(9).fill(null);

const Ticktack = () => {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = Tiktacwinner(board);

  const handleClick = (index) => {
    console.log("indexx",index)
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    console.log("newboardindex",newBoard[index])
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };
  console.log("borad",board)
  console.log("nextt",xIsNext)
  console.log("winner",winner)

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div>
      <div className="status">{getStatus()}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Ticktack;
