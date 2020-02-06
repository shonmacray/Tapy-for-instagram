import { createStore, combineReducers } from "redux";
import { backgroundReducer } from "./reducers";

const Store = createStore(
  combineReducers({
    backgroundReducer
  })
);

export default Store;
