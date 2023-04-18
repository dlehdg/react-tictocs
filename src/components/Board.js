import React, { useState } from 'react'
import Square from './Square';
import './Board.css'
// 버튼을 9개 설치

const Board = ({squares, onClick}) => {  // jsx는 꼭 부모 요소가 덮어줘야한다 , 
  // props를 통해 부모요소에서 함수와 state를 받아온다
      
  const renderSquare = (i) => {
      return ( <Square value={squares[i]} 
      onClick={() => onClick(i)} />
      );
  }

  
  
    return (
      <div className='board-wrapper'>
        

          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>

          <div className="board-row">
            {renderSquare(4)}
            {renderSquare(5)}
            {renderSquare(6)}
          </div>

          <div className="board-row">
            {renderSquare(7)}
            {renderSquare(8)}
            {renderSquare(9)}
          </div>


      </div>
    )
  }

export default Board

