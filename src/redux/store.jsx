import { configureStore } from "@reduxjs/toolkit";
import degenworkReducer from "./degenwork";
export default configureStore({
  reducer: {
    degenwork: degenworkReducer,
  },
});
