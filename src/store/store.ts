import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { MockServerApi } from '../mock/mockServer';
import { rootReducer } from '../reducers/indexReducer';
import { rootSaga } from '../sagas/rootSaga';
import { PocketState } from '../states/pocketsState';

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export const mockServerApi = new MockServerApi(store)
