import { useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  
  
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) } // history state는 배열이다
  ])
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);


  const current = history[stepNumber]; // 인덱스는 0부터 시작하기 때문에 하나를 빼준다
  


  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for(let index = 0; index < lines.length; index++){
      const [a,b,c] = lines[index];
      
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        
        return squares[a];
      }
    }
    return null;
}

  const winner = calculateWinner(current.squares);
  
  let status;
  if(winner){
      status = 'Winner: ' + winner;
  } else {
      status = `Next player : ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {

    const newHistory = history.slice(0, stepNumber + 1 ); // 복사 위치
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice(); // 현재 스퀘어를 복사본을 생성
    


    if(calculateWinner(newSquares) || newSquares[i]) {
        return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, { squares: newSquares }]); // ... 전개 연산자 -> 히스토리에 원래 있는것을 배열안에다 ,넣어버린다 , 그 후에 newSquares 즉 새로운 배열을 추가
    setXIsNext(prev => !prev); // 클릭시 반대값이 나오도록함 -> 이름 변경 가능

    setStepNumber(newHistory.length);
  }


  const moves = history.map((step, move) => {

    const desc = move ? 
    'Go to move #' + move : 
    'Go to game start';
    return ( 
      <li key={move}>
        <button className="move-button" onClick={()=>jumpTo(move)}> {desc} </button> 
      </li>
    );
    
    })

    const jumpTo = (step) => {
      setStepNumber(step); // step number를 업데이트 해주기 위해 함수 정의
      setXIsNext((step % 2) === 0); // stepnumber가 짝수일 때마다 xisnext를 true로 지정 
    }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares} // app 컴포넌트가 가지는 함수와 state를 borad 컴포넌트에 준다
          onClick={(i) => handleClick(i)}
        />
      </div>

      <div className="game-info">
        <div className="status">{status}</div>
        <ol style={{listStyle : 'none'}}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
