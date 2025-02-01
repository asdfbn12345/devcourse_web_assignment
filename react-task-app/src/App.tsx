import { useState } from "react";
import { appContainer, board, button } from "./App.css";
import ListsContainer from "./components/ListsContainer/ListsContainer";
import { useTypedSelector } from "./hooks/redux";
import BoardList from "./components/BoardList/BoardList";

function App() {
  const [activeBoardId, setActiveBoardId] = useState("board-0");
  const boardsState = useTypedSelector((state) => state.boards);

  const getActiveBoard = boardsState.boards.filter((board) => {
    return board.id === activeBoardId;
  })[0];
  const lists = getActiveBoard.lists;

  return (
    <div className={appContainer}>
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      ></BoardList>
      <div className={board}>
        <ListsContainer lists={lists} boardId={getActiveBoard.id} />
      </div>
      <div>
        <button className={button}>이 게시판 삭제하기</button>
        <button></button>
      </div>
    </div>
  );
}

export default App;
