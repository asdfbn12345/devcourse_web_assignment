import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardsState = {
  modalActive: boolean;
  boards: IBoard[];
};

const initialState: TBoardsState = {
  modalActive: true,
  boards: [
    {
      id: "board-1",
      name: "board1",
      lists: [
        {
          id: "list-1",
          name: "list1",
          tasks: [
            {
              id: "task-1",
              name: "task1",
              description: "description1",
              owner: "ho",
            },
          ],
        },
      ],
    },
  ],
};

type TAddBoardAction = {
  board: IBoard;
};

type TAddListAction = {
  boardId: string;
  list: IList;
};

type TDeleteListAction = {
  boardId: string;
  listId: string;
};

type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boards.push(payload.board);
    },
    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      state.boards.map((board) => {
        return board.id === payload.boardId
          ? { ...board, lists: board.lists.push(payload.list) }
          : board;
      });
    },
    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      state.boards = state.boards.map((board) => {
        return board.id === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter((list) => list.id !== payload.listId),
            }
          : board;
      });
    },
    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boards.map((board) => {
        return board.id === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) => {
                return list.id === payload.listId
                  ? { ...list, tasks: list.tasks.push(payload.task) }
                  : list;
              }),
            }
          : board;
      });
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
  },
});

export const { addBoard, addList, deleteList, addTask, setModalActive } =
  boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
