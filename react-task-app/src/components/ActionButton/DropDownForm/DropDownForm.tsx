import React, { ChangeEvent, useState } from "react";
import { FiX } from "react-icons/fi";
import { useTypedDispatch } from "../../../hooks/redux";
import { addList, addTask } from "../../../store/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";
import {
  button,
  buttons,
  close,
  input,
  listForm,
  taskForm,
} from "./DropDownForm.css";

type TDropDownFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string;
  listId: string;
  list?: boolean;
};

const DropDownForm: React.FC<TDropDownFormProps> = ({
  setIsFormOpen,
  boardId,
  listId,
  list,
}) => {
  const dispatch = useTypedDispatch();
  const [text, setText] = useState("");
  const formPlaceholder = list
    ? "리스트의 제목을 입력하세요."
    : "일의 제목을 입력하세요.";
  const buttonTitle = list ? "리스트 추가하기" : "일 추가하기";

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const handleButtonClick = () => {
    if (text) {
      if (list) {
        dispatch(
          addList({
            boardId,
            list: {
              id: uuidv4(),
              name: text,
              tasks: [],
            },
          })
        );
      } else {
        dispatch(
          addTask({
            boardId,
            listId,
            task: {
              id: uuidv4(),
              name: text,
              description: "",
              owner: "user",
            },
          })
        );
      }

      dispatch(
        addLog({
          id: uuidv4(),
          author: "user",
          message: `일 생성하기: ${text}`,
          timestamp: String(Date.now()),
        })
      );
    }
  };

  return (
    <div className={list ? listForm : taskForm}>
      <textarea
        autoFocus
        className={input}
        value={text}
        placeholder={formPlaceholder}
        onChange={handleTextChange}
        onBlur={() => setIsFormOpen(false)}
      />
      <div className={buttons}>
        <button className={button} onMouseDown={handleButtonClick}>
          {buttonTitle}
        </button>
        <FiX className={close} />
      </div>
    </div>
  );
};

export default DropDownForm;
