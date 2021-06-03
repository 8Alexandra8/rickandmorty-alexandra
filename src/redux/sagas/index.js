import { fork, all } from 'redux-saga/effects';
import charactersSaga from './characters'
import episodeSaga from './episodes'

export default function* rootSaga() {
    yield all([
        fork(charactersSaga),
        fork(episodeSaga)
    ]);
}
