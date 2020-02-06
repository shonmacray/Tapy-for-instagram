import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { backgroundReducer } from "./reducers";

const Store = createStore(
  combineReducers(
    {
      backgroundReducer
    },
    applyMiddleware(thunk)
  )
);

export default Store;
