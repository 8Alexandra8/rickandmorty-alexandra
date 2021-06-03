import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import Reducer from './reducers';
import rootSaga from './sagas'
import initialState from './initialState';

const loggerMiddleware = createLogger({
    timestamp: false,
    collapsed: true
});
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') middlewares.push(loggerMiddleware)
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

function configureStore(state) {
    const enhancer = composeEnhancers(compose(applyMiddleware(...middlewares)));
    return createStore(Reducer, state, enhancer);
}

export let store = {
    getState: () => initialState,
    dispatch: () => {}
};

const createStoreFn = state => {
    const reduxStore = configureStore(state);
    sagaMiddleware.run(rootSaga);
    store = reduxStore;
    return reduxStore;
};

export default createStoreFn;
