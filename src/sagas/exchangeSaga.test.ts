import { nextTick } from 'process';
import { testSaga } from 'redux-saga-test-plan';
import { put } from 'redux-saga/effects';
import { sendExchange, STOP_POLL_RATE, toggleExchangeLoading, updateRates, stopPollRate } from '../actions/exchangeActions';
import { toggleModal } from '../actions/modalActions';
import { updatePocket } from '../actions/pocketActions';
import { mockServerApi } from '../store/store';
import { POLL_DELAY } from '../typings/consts';
import { Currency } from '../typings/currency';
import { ModalKind } from '../typings/modals';
import { pollRate, sendExchangeHandler } from './exchangeSaga';

describe('ExchanngeSaga', ()=> {

    const testError = new Error('testError')

    describe('sendExchangeHandler', () => {
        it('When anything goes ok', () => {
            testSaga(
                sendExchangeHandler,
                sendExchange({
                    fromValue: 1,
                    fromCurrency: Currency.USD,
                    toCurrency: Currency.EUR
                })
            )
                .next()
                .call(mockServerApi.exchange, {
                    fromValue: 1,
                    fromCurrency: Currency.USD,
                    toCurrency: Currency.EUR
                })
                .next({
                    newFromValue: 40,
                    newToValue: 50
                })
                .all([
                    put(updatePocket({
                        currency: Currency.USD,
                        value: 40
                    })),
                    put(updatePocket({
                        currency: Currency.EUR,
                        value: 50
                    }))
                ])
                .next()
                .put(toggleExchangeLoading({value: false}))
                .next()
                .isDone()
        })

        it('When something goes wrong', () => {

            testSaga(
                sendExchangeHandler,
                sendExchange({
                    fromValue: 1,
                    fromCurrency: Currency.USD,
                    toCurrency: Currency.EUR
                })
            )
                .next()
                .throw(testError)
                .put(toggleModal({
                    modalKind: ModalKind.ErrorModal,
                    message: `Exchange error: ${testError}`
                }))
                .next()
                .put(toggleExchangeLoading({value: false}))
                .next()
                .isDone()
        })
    })

    describe('Polling', () => {

        it('lifecycle', () => {
            testSaga(
                pollRate,
            )
                // first poll
                .next()
                .call(mockServerApi.pollRate)
                .next(
                    [{
                        [Currency.USD]: {
                            [Currency.EUR]: 1.1
                        }
                    }]
                )
                .put(updateRates({rates: {
                    [Currency.USD]: {
                        [Currency.EUR]: 1.1
                    }
                }}))
                .next()
                .delay(POLL_DELAY)
                // second poll
                .next()
                .call(mockServerApi.pollRate)
                .throw(testError)
                .put(toggleModal({
                    modalKind: ModalKind.ErrorModal,
                    message: 'Rate poll error. Polling is stopped'
                }))
                .next()
                .put(stopPollRate())
        })
    })
})