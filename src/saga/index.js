import { all } from 'redux-saga/effects';
import boardSaga from "./Board.saga";

export default function* rootSaga() {
    yield all([boardSaga()])
}