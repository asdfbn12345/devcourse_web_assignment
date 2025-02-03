import React, { ChangeEvent, useState } from "react";
import { FiX } from "react-icons/fi";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import {
  deleteTask,
  setModalActive,
  updateTask,
} from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
import {
  buttons,
  closeButton,
  deleteButton,
  header,
  input,
  modalWindow,
  title,
  updateButton,
  wrapper,
} from "./EditModal.css";

const EditModal = () => {
  const dispatch = useTypedDispatch();
  const editingState = useTypedSelector((state) => {
    return state.modal;
  });
  const [data, setData] = useState(editingState);

  const handleCloseButton = () => {
    dispatch(setModalActive(false));
  };
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        name: event.target.value,
      },
    });
  };
  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        description: event.target.value,
      },
    });
  };
  const handleOwnerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        owner: event.target.value,
      },
    });
  };
  const handleUpdate = () => {
    dispatch(
      updateTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        task: data.task,
      })
    );

    dispatch(
      addLog({
        id: uuidv4(),
        message: `일 수정하기 ${editingState.task.name}`,
        author: "user",
        timestamp: String(Date.now()),
      })
    );

    dispatch(setModalActive(false));
  };
  const handleDelete = () => {
    dispatch(
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: editingState.task.id,
      })
    );

    dispatch(
      addLog({
        id: uuidv4(),
        message: `일 삭제하기 ${editingState.task.name}`,
        author: "user",
        timestamp: String(Date.now()),
      })
    );

    dispatch(setModalActive(false));
  };

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div>{editingState.task.name}</div>
          <FiX className={closeButton} onClick={handleCloseButton} />
        </div>
        <div className={title}>제목</div>
        <input
          className={input}
          type="text"
          value={data.task.name}
          onChange={handleNameChange}
        />
        <div className={title}>설명</div>
        <input
          className={input}
          type="text"
          value={data.task.description}
          onChange={handleDescriptionChange}
        />
        <div className={title}>생성한 사람</div>
        <input
          className={input}
          type="text"
          value={data.task.owner}
          onChange={handleOwnerChange}
        />
        <div className={buttons}>
          <button className={updateButton} onClick={handleUpdate}>
            일 수정하기
          </button>
          <button className={deleteButton} onClick={handleDelete}>
            일 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
