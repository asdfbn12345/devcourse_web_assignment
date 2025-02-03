import React from "react";
import { container, title, content } from "./Task.css";
import { Draggable } from "react-beautiful-dnd";

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
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={container}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className={title}>{name}</div>
          <div className={content}>{description}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
