import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogItem } from "../../types";

type TLoggerState = {
  logs: ILogItem[];
};

const initialState: TLoggerState = {
  logs: [],
};

const loggerSlice = createSlice({
  name: "logger",
  initialState,
  reducers: {
    addLog: (state, { payload }: PayloadAction<ILogItem>) => {
      state.logs.push(payload);
    },
  },
});

export const { addLog } = loggerSlice.actions;
export const loggerReducer = loggerSlice.reducer;
