import { createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../types";

type TBoardsState = {
  modalActive: boolean;
  boards: IBoard[];
};

const initialState: TBoardsState = {
  modalActive: true,
  boards: [
    {
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

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
});

export const boardsReducer = boardsSlice.reducer;
