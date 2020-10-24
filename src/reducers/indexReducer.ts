import { combineReducers } from 'redux';
import { pocketReducer } from './pocketsReducer';
import { exhangeReducer } from './exchangeReducer';

export const rootReducer = combineReducers({
    pockets: pocketReducer,
    exchange: exhangeReducer
})