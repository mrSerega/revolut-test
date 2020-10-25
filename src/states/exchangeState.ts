import { Currency } from '../typings/currency'
import { RootState } from './indexState'

export interface ExchangeState {
    rates: {
        [index: string]: {
            [index: string]: number
        }
    }
    isExchangeLoading: boolean,
    isRatesLoading: boolean,
    isRatesInitialized: boolean
}

export const exchangeInitialState: ExchangeState = {
    rates: {},
    isExchangeLoading: false,
    isRatesLoading: false,
    isRatesInitialized: false
}

export class ExchangeSelector {
    static getRate = (state: RootState) => state.exchange.rates
    static getFlags = (state: RootState) => ({
        isExchangeLoading: state.exchange.isExchangeLoading,
        isRatesLoading: state.exchange.isRatesLoading,
        isRatesInitialized: state.exchange.isRatesInitialized
    })
}