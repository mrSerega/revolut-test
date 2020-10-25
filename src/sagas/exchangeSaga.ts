import { SendExchangeAction, SEND_EXCHANGE, START_POLL_RATE, STOP_POLL_RATE, toggleExchangeLoading, updateRates } from '../actions/exchangeActions';
import { all, call, delay, put, race, take, takeLatest } from 'redux-saga/effects'
import { ExchangeResponse } from '../mock/mockServer';
import { mockServerApi } from '../store/store';
import { updatePocket } from '../actions/pocketActions';



function* sendExchangeHandler({
    payload
}: SendExchangeAction) {
    try {
        const {
            newFromValue,
            newToValue
        }: ExchangeResponse  = yield call(mockServerApi.exchange, payload)

        yield all([
            put(updatePocket({
                currency: payload.fromCurrency,
                value: newFromValue
            })),
            put(updatePocket({
                currency: payload.toCurrency,
                value: newToValue
            }))
        ])

        yield put(toggleExchangeLoading({value: false}))

    } catch (err) {
        console.log('ERROR!!!!', err)
        throw (err) // TODO:
    }
}

function* pollRate() {
    console.log('start poll')
    while (true) {
        try {
            console.log('POLL')
            const responses: {
                [index: string]: {
                    [index: string]: number
                }
            }[] = yield call(mockServerApi.pollRate)
            let rates  = {}
            responses.forEach(r => {
                rates = {
                    ...rates,
                    ...r
                }
            });
            yield put(updateRates({rates}))
            yield delay(10000) // TODO: use const
        } catch (err) {
            console.log('ERRR0RRR~!', err) // TODO:
            // handle stop here
            yield put({ type: STOP_POLL_RATE, err });
        }
    }
}

function* watchPollRate() {
    while(true) {
        yield take(START_POLL_RATE)
        yield race([call(pollRate), take(STOP_POLL_RATE)])
    }
}

export function* watchSendExhange() {
    yield takeLatest(SEND_EXCHANGE, sendExchangeHandler)
}

export function* exhangeSaga() {
    yield all([
        watchSendExhange(),
        watchPollRate()
    ])
}