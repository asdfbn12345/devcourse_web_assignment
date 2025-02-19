import { useState } from "react";
import {
  appContainer,
  board,
  deleteBoardButton,
  loggerButton,
} from "./App.css";
import ListsContainer from "./components/ListsContainer/ListsContainer";
import { useTypedDispatch, useTypedSelector } from "./hooks/redux";
import BoardList from "./components/BoardList/BoardList";
import EditModal from "./components/EditModal/EditModal";
import LoggerModal from "./components/LoggerModal/LoggerModal";
import { deleteBoard, sort } from "./store/slices/boardsSlice";
import { addLog } from "./store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

function App() {
  const dispatch = useTypedDispatch();
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState("board-1");
  const modalActive = useTypedSelector((state) => state.boards.modalActive);
  const boardsState = useTypedSelector((state) => state.boards);

  const getActiveBoard = boardsState.boards.filter((board) => {
    return board.id === activeBoardId;
  })[0];
  const lists = getActiveBoard.lists;

  const handleDeleteBoard = () => {
    if (boardsState.boards.length > 1) {
      dispatch(deleteBoard({ boardId: getActiveBoard.id }));

      dispatch(
        addLog({
          id: uuidv4(),
          author: "user",
          message: `게시판 지우기: ${getActiveBoard.name}`,
          timestamp: String(Date.now()),
        })
      );

      const newIndexToSet = () => {
        const indexToBeDeleted = boardsState.boards.findIndex((board) => {
          return board.id === activeBoardId;
        });

        return indexToBeDeleted === 0
          ? indexToBeDeleted + 1
          : indexToBeDeleted - 1;
      };

      setActiveBoardId(boardsState.boards[newIndexToSet()].id);
    } else {
      alert("최소 게시판 개수는 한 개 입니다.");
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    const sourceList = lists.filter(
      (list) => list.id === source.droppableId
    )[0];

    dispatch(
      sort({
        boardId: activeBoardId,
        listIdStart: source.droppableId,
        listIdEnd: destination?.droppableId,
        taskIndexStart: source.index,
        taskIndexEnd: destination?.index,
        id: draggableId,
      })
    );

    const destinationListName = lists.filter(
      (list) => list.id === destination?.droppableId
    )[0].name;
    const taskName = sourceList.tasks.filter(
      (task) => task.id === draggableId
    )[0].name;
    dispatch(
      addLog({
        id: uuidv4(),
        author: "user",
        message: `작업 ${taskName}을 리스트 ${sourceList.name}에서 리스트 ${destinationListName}으로 이동`,
        timestamp: String(Date.now()),
      })
    );
  };

  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      {modalActive ? <EditModal /> : null}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      ></BoardList>
      <div className={board}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListsContainer lists={lists} boardId={getActiveBoard.id} />
        </DragDropContext>
      </div>
      <div>
        <button className={deleteBoardButton} onClick={handleDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button
          className={loggerButton}
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}
        >
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>
  );
}

export default App;
