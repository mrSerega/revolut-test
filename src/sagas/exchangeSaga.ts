import { SEND_EXCHANGE } from '../actions/exchangeActions';
import { all, call, takeLatest } from 'redux-saga/effects'
import { MockServerApi } from '../mock/mockServer';



function* sendExchangeHandler(
//     {
//     payload
// }: SendExchangeAction
) {
    // try { TODO:
        console.log('SAGA!')
        const toAmount = yield call(MockServerApi.exchange)
        console.log(toAmount)
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