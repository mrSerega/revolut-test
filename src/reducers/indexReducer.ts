import { combineReducers } from 'redux';
import { pocketReducer } from './pocketsReducer';
import { exhangeReducer } from './exchangeReducer';
import { modalReducer } from './modalReducer';

export const rootReducer = combineReducers({
    pockets: pocketReducer,
    exchange: exhangeReducer,
    modals: modalReducer
})