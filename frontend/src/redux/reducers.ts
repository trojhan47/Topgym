import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { connectRouter } from "connected-react-router";
import storage from "redux-persist/lib/storage";

import account from "./accounts/reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account"],
};

const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    account,
  });

export default (history: any) =>
  persistReducer(persistConfig, rootReducer(history));

export type IRootState = {
  router: any;
  account: any;
};
