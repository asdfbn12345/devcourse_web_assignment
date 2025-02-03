import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardsState = {
  modalActive: boolean;
  boards: IBoard[];
};

const initialState: TBoardsState = {
  modalActive: false,
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

type TDeleteBoardAction = {
  boardId: string;
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

type TUpdateTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

type TDeleteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};

type TSortAction = {
  boardId: string;
  listIdStart: string;
  listIdEnd?: string;
  taskIndexStart: number;
  taskIndexEnd?: number;
  id: string;
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boards.push(payload.board);
    },
    deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
      state.boards = state.boards.filter((board) => {
        return board.id !== payload.boardId;
      });
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
    updateTask: (state, { payload }: PayloadAction<TUpdateTaskAction>) => {
      state.boards = state.boards.map((board) => {
        return board.id === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) => {
                return list.id === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.map((task) => {
                        return task.id === payload.task.id
                          ? payload.task
                          : task;
                      }),
                    }
                  : list;
              }),
            }
          : board;
      });
    },
    deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
      state.boards = state.boards.map((board) => {
        return board.id === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) => {
                return list.id === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.filter((task) => {
                        return task.id !== payload.taskId;
                      }),
                    }
                  : list;
              }),
            }
          : board;
      });
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
    sort: (state, { payload }: PayloadAction<TSortAction>) => {
      if (
        payload.listIdEnd === undefined ||
        payload.taskIndexEnd === undefined
      ) {
        return;
      }

      const board = state.boards.filter(
        (board) => board.id === payload.boardId
      )[0];
      const listStart = board.lists.find(
        (list) => list.id === payload.listIdStart
      );
      const card = listStart?.tasks.splice(payload.taskIndexStart, 1);

      const listEnd = board.lists.find((list) => list.id === payload.listIdEnd);
      listEnd?.tasks.splice(payload.taskIndexEnd, 0, ...card!);
    },
  },
});

export const {
  addBoard,
  deleteBoard,
  addList,
  deleteList,
  addTask,
  updateTask,
  deleteTask,
  setModalActive,
  sort,
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
