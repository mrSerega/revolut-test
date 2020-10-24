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


export type ExchangeActions =
    | SendExchangeAction
