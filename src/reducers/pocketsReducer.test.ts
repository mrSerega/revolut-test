import { Currency } from '../typings/currency';
import { pocketReducer } from './pocketsReducer';
import { pocketInitialState } from '../states/pocketsState';
import { updatePocket } from '../actions/pocketActions';

describe('pockets reducer', () => {
    it ('should handle UPDATE_POCKET', () => {
        expect(
            pocketReducer(
                pocketInitialState,
                updatePocket({
                    currency: Currency.USD,
                    value: 1337
                })
            )
        ).toEqual({
            ...pocketInitialState,
            pocketList: [
                ...pocketInitialState.pocketList.filter(p => p.currency !== Currency.USD),
                {
                    currency: Currency.USD,
                    balance: 1337
                }
            ]
        })
    })
})