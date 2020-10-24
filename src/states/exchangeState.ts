import { RootState } from './indexState'

export interface ExchangeState {
    currentExchangeRate?: number
    isExchangeLoading: boolean
}

export const exchangeInitialState: ExchangeState = {
    currentExchangeRate: 2,
    isExchangeLoading: false
}

export class ExchangeSelector {
    static getRate = (state: RootState) => state.exchange.currentExchangeRate
}