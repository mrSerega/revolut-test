import { exchangeInitialState, ExchangeState } from '../states/exchangeState';
import { ExchangeActions } from '../actions/exchangeActions';

export function exhangeReducer(
    state = exchangeInitialState,
    action: ExchangeActions
): ExchangeState {
    switch (action.type) {
        default:
            return state
    }
}