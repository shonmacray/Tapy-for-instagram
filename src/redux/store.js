import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "./reducers";

const Store = createStore(
  combineReducers(
    {
      appReducer
    },
    applyMiddleware(thunk)
  )
);

export default Store;
