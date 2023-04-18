import React from 'react';
import "./Square.css";
// 버튼 컴포넌트

const Square = ({onClick, value}) => {
    
        return (
            <button className="square" 
              onClick={onClick}>
              {value} 
            </button>
        )
    
    
  }

  export default Square;