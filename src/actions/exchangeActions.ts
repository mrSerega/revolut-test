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

export const START_POLL_RATE = 'START_POLL_RATE'
export interface StartPollRateAction {
    type: typeof START_POLL_RATE,
}
export function startPollRate(): StartPollRateAction {
    return {
        type: START_POLL_RATE,
    }
}

export const STOP_POLL_RATE = 'STOP_POLL_RATE'
export interface StopPollRateAction {
    type: typeof STOP_POLL_RATE,
}
export function stopPollRate(): StopPollRateAction {
    return {
        type: STOP_POLL_RATE,
    }
}

export const UPDATE_RATES = 'UPDATE_RATES'
export interface UpdateRatesPayload {
    rates: {
        [index: string]: {
            [index: string]: number
        }
    }
}
export interface UpdateRatesAction {
    type: typeof UPDATE_RATES,
    payload: UpdateRatesPayload
}
export function updateRates(payload: UpdateRatesPayload): UpdateRatesAction {
    return {
        type: UPDATE_RATES,
        payload
    }
}


export type ExchangeActions =
    | SendExchangeAction
    | ToggleExchangeLoadingAction
    | StartPollRateAction
    | StopPollRateAction
    | UpdateRatesAction
