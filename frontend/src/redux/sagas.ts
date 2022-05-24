import { all } from "redux-saga/effects";
import account from "./accounts/sagas";
// other redux types implemented will be imported here

export default function* rootSaga() {
  // all redux types imported will be called here, seperated by comas
  yield all([account()]);
}
