import { exchangeInitialState } from '../states/exchangeState'
import { exhangeReducer } from './exchangeReducer'
import { sendExchange, toggleExchangeLoading, updateRates } from '../actions/exchangeActions';
import { Currency } from '../typings/currency';

describe('exchange reducer', () => {
    it ('should handle SEND_EXCHANGE', () => {
        expect(
            exhangeReducer(
                exchangeInitialState,
                sendExchange({
                    fromValue: 1,
                    fromCurrency: Currency.USD,
                    toCurrency: Currency.EUR
                })
            )
        ).toEqual({
            ...exchangeInitialState,
            isExchangeLoading: true
        })
    })
    it ('should handle TOGGLE_EXCHANGE_LOADING', () => {
        expect(
            exhangeReducer(
                exchangeInitialState,
                toggleExchangeLoading({
                    value: true
                })
            )
        ).toEqual({
            ...exchangeInitialState,
            isExchangeLoading: true
        })
    })
    it ('should handle UPDATE_RATES', () => {
        expect(
            exhangeReducer(
                exchangeInitialState,
                updateRates({
                    rates: {}
                })
            )
        ).toEqual({
            ...exchangeInitialState,
            rates: {},
            isRatesInitialized: true
        })
    })
})