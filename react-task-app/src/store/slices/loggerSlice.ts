import { createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
});

export const loggerReducer = loggerSlice.reducer;
