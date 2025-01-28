import { useState } from "react";
import { appContainer, board, button } from "./App.css";

function App() {
  const [activeBoardId, setActiveBoardId] = useState("board-0");

  return (
    <div className={appContainer}>
      <div className={board}>
        <BoardList
          activeBoardId={activeBoardId}
          setActiveBoardId={setActiveBoardId}
        ></BoardList>
      </div>
      <div>
        <button className={button}>이 게시판 삭제하기</button>
        <button></button>
      </div>
    </div>
  );
}

export default App;
