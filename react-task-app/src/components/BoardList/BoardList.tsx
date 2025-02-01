import React, { useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { FiPlusCircle } from "react-icons/fi";
import SideForm from "./SideForm/SideForm";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./BoardList.css";
import clsx from "clsx";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: React.FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const { boards } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleOnClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className={container}>
      <div className={title}>게시판:</div>
      {boards.map((board, index) => (
        <div
          key={board.id}
          className={clsx(
            {
              [boardItemActive]:
                boards.findIndex((board) => board.id === activeBoardId) ===
                index,
            },
            {
              [boardItem]:
                boards.findIndex((board) => board.id === activeBoardId) !==
                index,
            }
          )}
        >
          <div>{board.name}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleOnClick} />
        )}
      </div>
    </div>
  );
};

export default BoardList;
