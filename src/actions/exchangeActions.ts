import { Currency } from '../typings/currency';

export const SEND_EXCHANGE = 'SEND_EXCHANGE'
export interface SendExchangePayload {
    fromValue: number
    fromCurrency: Currency
    toCurrency: Currency
}
export interface SendExchangeAction {
    type: typeof SEND_EXCHANGE,
    payload: SendExchangePayload
}
export function sendExchange(payload: SendExchangePayload): SendExchangeAction {
    return {
        type: SEND_EXCHANGE,
        payload
    }
}

export const TOGGLE_EXCHANGE_LOADING = 'TOGGLE_EXCHANGE_LOADING'
export interface ToggleExchangeLoadingPayload {
    value: boolean;
}
export interface ToggleExchangeLoadingAction {
    type: typeof TOGGLE_EXCHANGE_LOADING,
    payload: ToggleExchangeLoadingPayload
}
export function toggleExchangeLoading(payload: ToggleExchangeLoadingPayload): ToggleExchangeLoadingAction {
    return {
        type: TOGGLE_EXCHANGE_LOADING,
        payload
    }
}


export type ExchangeActions =
    | SendExchangeAction
    | ToggleExchangeLoadingAction
