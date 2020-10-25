import { Action, Store } from 'redux';
import { Currency } from '../typings/currency';
import { PocketState } from '../states/pocketsState';
import { ExchangeState } from '../states/exchangeState';

export interface ExchangeResponse {
    newFromValue: number,
    newToValue: number
}

export class MockServerApi<S, StateExt, A extends Action, Ext> {

    store: Store<S & StateExt, A> & Ext

    constructor(store: Store<S & StateExt, A> & Ext) {
        console.log('constructor', store)
        this.store = store
        console.log(this.store)
    }

    public exchange = (
        {
        fromValue,
        fromCurrency,
        toCurrency
    }: {
        fromValue: number,
        fromCurrency: Currency,
        toCurrency: Currency
    }
    ): Promise<ExchangeResponse> => {


        const state: {
            pockets: PocketState,
            exchange: ExchangeState
        } = this.store.getState() as any

        return new Promise((res, rej) => {
            setTimeout(() => {
                const fromPocket = state.pockets.pocketList.find(p => p.currency === fromCurrency)

                if (!fromPocket) {
                    rej(new Error(`MockServer. there isn't  ${fromCurrency} pocket`))
                    return
                }

                if (fromValue > fromPocket.balance) {
                    rej(new Error(`MockServer. insufficient funds in ${fromCurrency} pocket`))
                    return
                }

                const toPocket = state.pockets.pocketList.find(p => p.currency === toCurrency)

                if (!toPocket) {
                    rej(new Error(`MockServer. there isn't  ${toCurrency} pocket`))
                    return
                }

                const rate = state.exchange.currentExchangeRate

                if (!rate) {
                    rej(new Error(`MockServer. there isn't exchange rate`))
                    return
                }

                const newFromValue = fromPocket.balance - fromValue
                const newToValue = toPocket.balance + fromValue * rate
                res({
                    newFromValue,
                    newToValue
                })
            }, Math.random() * 5000)
        })
    }
}