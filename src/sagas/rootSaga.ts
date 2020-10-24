import { all } from 'redux-saga/effects';
import { exhangeSaga } from './exchangeSaga';

export function* rootSaga() {
    yield all([exhangeSaga()])
}