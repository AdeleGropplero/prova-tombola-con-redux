import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CellsReducer from "./reducers/CellsReducers";

const rootReducer = combineReducers({
  cells: CellsReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
