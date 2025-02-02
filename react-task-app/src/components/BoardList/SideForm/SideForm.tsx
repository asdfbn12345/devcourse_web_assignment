import React, { ChangeEvent, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { icon, input, sideForm } from "./SideForm.css";
import { useTypedDispatch } from "../../../hooks/redux";
import { v4 as uuidv4 } from "uuid";
import { addBoard } from "../../../store/slices/boardsSlice";
import { addLog } from "../../../store/slices/loggerSlice";

type TSideFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideForm: React.FC<TSideFormProps> = ({ setIsFormOpen }) => {
  const [inputText, setInputText] = useState("");
  const dispatch = useTypedDispatch();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  const handleOnBlur = () => {
    setIsFormOpen(false);
  };

  const handleOnMouseDown = () => {
    if (inputText) {
      dispatch(
        addBoard({
          board: {
            id: uuidv4(),
            name: inputText,
            lists: [],
          },
        })
      );

      dispatch(
        addLog({
          id: uuidv4(),
          message: `게시판 등록: ${inputText}`,
          author: "user",
          timestamp: String(Date.now()),
        })
      );
    }
  };

  return (
    <div className={sideForm}>
      <input
        autoFocus
        className={input}
        type="text"
        placeholder="새로운 게시판 등록하기"
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      <FiCheck className={icon} onMouseDown={handleOnMouseDown} />
    </div>
  );
};

export default SideForm;
