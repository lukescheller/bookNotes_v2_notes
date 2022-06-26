import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./userSlice";
import entryReducer from "./entrySlice";
import editReducer from "./editSlice";

export default configureStore({
  reducer: {
    user: mainReducer,
    entry: entryReducer,
    edit: editReducer,
  },
});
