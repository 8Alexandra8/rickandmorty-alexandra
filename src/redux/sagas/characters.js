import { call, put, takeEvery } from 'redux-saga/effects'
import {
    CHARACTERS_FETCH_REQUESTED,
    CHARACTERS_FETCH_FAILED,
    CHARACTERS_FETCH_SUCCEEDED
} from "../actionTypes/characters";

function fetchCharactersList(url) {
    return fetch(url).then(response => response.json());
}

function* workerCharactersListSaga({ url }) {
    try {
        const response = yield call(fetchCharactersList, url);
        yield put({type: CHARACTERS_FETCH_SUCCEEDED, url, response});
    } catch (e) {
        yield put({type: CHARACTERS_FETCH_FAILED});
        alert(e.message);
    }
}

export default function* watcherCharactersListSaga() {
    yield takeEvery(CHARACTERS_FETCH_REQUESTED, workerCharactersListSaga);
}
