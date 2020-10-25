import { exchangeInitialState, ExchangeState } from '../states/exchangeState';
import { ExchangeActions, SEND_EXCHANGE, TOGGLE_EXCHANGE_LOADING, UPDATE_RATES } from '../actions/exchangeActions';

export function exhangeReducer(
    state = exchangeInitialState,
    action: ExchangeActions
): ExchangeState {
    switch (action.type) {
        case SEND_EXCHANGE:
            return {
                ...state,
                isExchangeLoading: true
            }
        case TOGGLE_EXCHANGE_LOADING:
            return {
                ...state,
                isExchangeLoading: action.payload.value
            }
        case UPDATE_RATES: {
            return {
                ...state,
                rates: action.payload.rates,
                isRatesInitialized: true
            }
        }
        default:
            return state
    }
}