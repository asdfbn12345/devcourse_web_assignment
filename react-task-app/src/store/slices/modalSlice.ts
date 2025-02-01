import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../../types";

type TSetModalDataAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

type TModalState = {
  boardId: string;
  listId: string;
  task: ITask;
};

const initialState: TModalState = {
  boardId: "board-0",
  listId: "list-0",
  task: {
    id: "task-0",
    name: "task-0",
    description: "task description",
    owner: "John",
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalData: (state, { payload }: PayloadAction<TSetModalDataAction>) => {
      state.boardId = payload.boardId;
      state.listId = payload.listId;
      state.task = payload.task;
    },
  },
});

export const { setModalData } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
