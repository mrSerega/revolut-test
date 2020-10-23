import { combineReducers } from 'redux';
import { pocketReducer } from './pocketsReducer';

export const rootReducer = combineReducers({
    pockets: pocketReducer
})