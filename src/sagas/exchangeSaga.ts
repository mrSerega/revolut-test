import { SendExchangeAction, SEND_EXCHANGE, toggleExchangeLoading } from '../actions/exchangeActions';
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { ExchangeResponse, MockServerApi } from '../mock/mockServer';
import { mockServerApi } from '../store/store';
import { updatePocket } from '../actions/pocketActions';



function* sendExchangeHandler({
    payload
}: SendExchangeAction) {
    // try { TODO:
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

    // } catch (err) {

    // }
}

export function* watchSendExhange() {
    yield takeLatest(SEND_EXCHANGE, sendExchangeHandler)
}

export function* exhangeSaga() {
    yield all([
        watchSendExhange()
    ])
}