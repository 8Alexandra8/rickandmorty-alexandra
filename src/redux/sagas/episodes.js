import { call, put, takeEvery, take, cancel, race, fork } from 'redux-saga/effects'
import { CHARACTERS_FETCH_SUCCEEDED } from "../actionTypes/characters";
import { EPISODE_FETCH_FAILED, EPISODE_FETCH_SUCCEEDED } from "../actionTypes/episode";

export function fetchEpisode(episode) {
    return fetch(episode).then(response => response.json());
}

function* workerEpisodeSaga(item) {
    try {
        const response = yield call(fetchEpisode, item.episode[0]);
        yield put({type: EPISODE_FETCH_SUCCEEDED, response, characterId: item.id});
    } catch(e) {
        yield put({type: EPISODE_FETCH_FAILED});
        alert(e.message);
    }
}

function* parallelEpisodeSaga(item) {
    const task = yield fork(workerEpisodeSaga, item);
    const { error } = yield race({
        success: take(EPISODE_FETCH_SUCCEEDED),
        error: take(EPISODE_FETCH_FAILED),
    })
    if(error) {
        yield cancel(task);
    }
}

function* workerEpisodeListSaga({ response }) {
    try {
        for (let item of response.results) {
            yield call(parallelEpisodeSaga, item);
        }
    } catch (e) {
        alert(e.message);
    }
}

export default function* watcherEpisodeSaga() {
    yield takeEvery(CHARACTERS_FETCH_SUCCEEDED, workerEpisodeListSaga);
}
