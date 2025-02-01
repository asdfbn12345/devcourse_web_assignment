import React from "react";
import { container, title, content } from "./Task.css";

type TTaskProps = {
  boardId: string;
  index: number;
  id: string;
  name: string;
  description: string;
};

const Task: React.FC<TTaskProps> = ({
  boardId,
  index,
  id,
  name,
  description,
}) => {
  return (
    <div className={container}>
      <div className={title}>{name}</div>
      <div className={content}>{description}</div>
    </div>
  );
};

export default Task;
