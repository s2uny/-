import { useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  //squares 객체가 담겨있는 배열, squares에는 9개의 값이 null로 되어 있다.
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);

  // 플레이어 안내, 초기값 true
  const [xIsNext, setXIsNext] = useState(true);

  // 스텝(단계), 초기값 0
  const [stepNumber, setStepNumber] = useState(0);

  // 정답계산식
  const calculateWinner = (squares) => {
    // 가능한 승리 조합
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
      // 예를 들어, lines[i]가 [0, 1, 2]라고 가정하면,
      // 배열 분해 할당을 사용하여 a, b, c 변수에 각각 0, 1, 2 값을 할당
      // 이렇게 할당된 a, b, c는 이후 코드에서 각각 squares[a], squares[b], squares[c]의 값을 의미
      const [a, b, c] = lines[i];
      if (
        //squares[a]가 존재하고(null, undefined, 빈 문자열이 아님) squares[a], squares[b], squares[c]의 값이 모두 동일한 경우(예: 모두 'X' 또는 모두 'O')
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // history 배열에서 stepNumber 인덱스에 해당하는 원소를 가져와서 current 변수에 할당
  const current = history[stepNumber];
  console.log(history);
  console.log(stepNumber);
  // 정답이 아니면 null을 반환
  const winner = calculateWinner(current.squares); // 계산식의 스퀘어 값
  console.log(winner);

  let status;
  if (winner) {
    status = `승자는 ` + winner;
  } else {
    status = `다음플레이어 ${xIsNext ? "현재" : "상선"}`;
  }

  const handleCilck = (i) => {
    // history 배열의 인덱스 0부터 'stepNumber'까지의 원소를 포함하는 새로운 배열을 반환. 이를 통해 현재까지 진행된 게임 이력만을 저장하는 'newHistory' 배열이 생성됨.
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }

    newSquares[i] = xIsNext ? "X" : "O";
    setHistory([...newHistory, { squares: newSquares }]);
    setXIsNext((prev) => !prev);

    setStepNumber(newHistory.length);
  };

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : `Go to game start`;
    return (
      <li key={move}>
        <button className="move-button" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          // status={status}
          squares={current.squares}
          handleCilck={(i) => handleCilck(i)}
        />
      </div>
      <div className="game-info">
        <p>{status}</p>
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

export default App;
