import { SendExchangeAction, SEND_EXCHANGE, START_POLL_RATE, STOP_POLL_RATE, toggleExchangeLoading, updateRates } from '../actions/exchangeActions';
import { all, call, delay, put, race, take, takeLatest } from 'redux-saga/effects'
import { ExchangeResponse } from '../mock/mockServer';
import { mockServerApi } from '../store/store';
import { updatePocket } from '../actions/pocketActions';
import { toggleModal } from '../actions/modalActions';
import { ModalKind } from '../typings/modals';
import { POLL_DELAY } from '../typings/consts';



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
    } catch (err) {
        yield put(toggleModal({
            modalKind: ModalKind.ErrorModal,
            message: `Exchange error: ${err}`
        }))
        // TODO: send error to sentry or something similar
    } finally {
        yield put(toggleExchangeLoading({value: false}))
    }
}

function* pollRate() {
    while (true) {
        try {
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
            yield delay(POLL_DELAY)
        } catch (err) {
            yield put(toggleModal({
                modalKind: ModalKind.ErrorModal,
                message: 'Rate poll error. Polling is stopped'
            }))
            yield put({ type: STOP_POLL_RATE, err });
            // TODO: send error to sentry or something similar
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