import { boardsReducer } from "../slices/boardsSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";
import { userReducer } from "../slices/userSlice";

const reducer = {
  boards: boardsReducer,
  logger: loggerReducer,
  modal: modalReducer,
  user: userReducer,
};

export default reducer;
