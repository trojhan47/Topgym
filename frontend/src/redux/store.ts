import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import { persistStore } from "redux-persist";
import { routerMiddleware } from "connected-react-router";

import reducers from "./reducers";
import sagas from "./sagas";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middlewares: any[] = [sagaMiddleware];

middlewares.push(routerMiddleware(history));
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(
  reducers(history),
  compose(applyMiddleware(...middlewares))
);

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);

export default store;
