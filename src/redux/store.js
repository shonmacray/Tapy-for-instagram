import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";

import { appReducer, userReducer } from "./reducers";

const rootReducer = combineReducers({
  appReducer,
  userReducer
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: "appReducer",
  whitelist: "userReducer"
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
  return store.getState();
};

export { getStore, getState, getPersistor };
export default {
  getStore,
  getState,
  getPersistor
};
