import React from "react";
import { GrSubtract } from "react-icons/gr";
import { IList, ITask } from "../../types";
import Task from "../Task/Task";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteList, setModalActive } from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import { deleteButton, listWrapper } from "./List.css";
import ActionButton from "../ActionButton/ActionButton";

type TListProps = {
  key: string;
  list: IList;
  boardId: string;
};

const List: React.FC<TListProps> = ({ list, boardId }) => {
  const dispatch = useTypedDispatch();
  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        id: uuidv4(),
        message: `리스트 삭제하기: ${list.name}`,
        author: "user",
        timestamp: String(Date.now()),
      })
    );
  };

  const handleTaskChange = (boardId: string, listId: string, task: ITask) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  return (
    <div className={listWrapper}>
      <div>
        <div>{list.name}</div>
        <GrSubtract
          className={deleteButton}
          onClick={() => handleListDelete(list.id)}
        />
      </div>
      {list.tasks.map((task, index) => {
        return (
          <div
            key={task.id}
            onClick={() => handleTaskChange(boardId, list.id, task)}
          >
            <Task
              boardId={boardId}
              index={index}
              id={task.id}
              name={task.name}
              description={task.description}
            />
          </div>
        );
      })}
      <ActionButton boardId={boardId} listId={list.id} />
    </div>
  );
};

export default List;
