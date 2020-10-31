import { Action, Store } from 'redux';
import { Currency } from '../typings/currency';
import { PocketState } from '../states/pocketsState';
import { ExchangeState } from '../states/exchangeState';
import { EXCHANGE_ERROR_PROBABILITY, EXCHANGE_MAX_DELAY } from '../typings/consts';

export interface ExchangeResponse {
    newFromValue: number,
    newToValue: number
}

export interface RateResponse {
    base: string,
    date: string,
    rates: {
        [index: string]: number
    }
}

export class MockServerApi<S, StateExt, A extends Action, Ext> {

    store: Store<S & StateExt, A> & Ext

    constructor(store: Store<S & StateExt, A> & Ext) {
        this.store = store
    }

    public exchange = ({
        fromValue,
        fromCurrency,
        toCurrency
    }: {
        fromValue: number,
        fromCurrency: Currency,
        toCurrency: Currency
    }): Promise<ExchangeResponse> => {


        const state: {
            pockets: PocketState,
            exchange: ExchangeState
        } = this.store.getState() as any



        return new Promise((res, rej) => {
            setTimeout(() => {

                if (Math.random() < EXCHANGE_ERROR_PROBABILITY) {
                    rej('Random error. This error was generated just for demonstration of error handling. Have a nice day :)')
                }

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

                const currentRates = state.exchange.rates[fromCurrency]

                if (!currentRates) {
                    rej(new Error(`MockServer. there isn't exchange rate for ${fromCurrency}`))
                    return
                }

                const rate = currentRates[toCurrency]


                if (typeof rate !== 'number') {
                    rej(new Error(`MockServer. there isn't exchange rate for ${fromCurrency} -> ${toCurrency}`))
                    return
                }

                const newFromValue = fromPocket.balance - fromValue
                const newToValue = toPocket.balance + fromValue * rate
                res({
                    newFromValue,
                    newToValue
                })
            }, Math.random() * EXCHANGE_MAX_DELAY)
        })
    }

    public pollRate = async () => {
        const {
            pockets: {
                pocketList
            }
        }: {
            pockets: PocketState,
            exchange: ExchangeState
        } = this.store.getState() as any

        return Promise.all(pocketList.map(pocket => {
            const base = pocket.currency
            const symbols = pocketList.filter(p => p.currency !== base).map(p=> p.currency).join(',')
            const url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`

            return new Promise(async (res, rej) => {
                try {
                    const response = await fetch(url)
                    if (response.ok) {
                        const json: RateResponse = await response.json()
                        res({
                            [base]: {...json.rates, [base]: 1.0}
                        })
                    } else {
                        rej(new Error(`MockServer. Unsuccessful answer: ${response} for request: ${url}`))
                    }
                } catch (err) {
                    rej(err)
                }
            })
        }))
    }
}