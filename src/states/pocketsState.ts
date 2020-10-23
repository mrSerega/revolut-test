import { Currency } from '../typings/currency';
import { Pocket } from '../typings/pocket';
import { RootState } from './indexState';

export const pocketInitialState: PocketState = {
    pocketList: [
        {
            currency: Currency.EUR,
            balance: 100
        },
        {
            currency: Currency.GBP,
            balance: 101
        },
        {
            currency: Currency.USD,
            balance: 102
        }
    ]
}

export interface PocketState {
    pocketList: Pocket[]
}

export class PocketSelector {
    static getPocket = (currency: Currency) => (state: RootState) => state.pockets.pocketList.find(p => p.currency === currency)
}