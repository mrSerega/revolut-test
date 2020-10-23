import { pocketInitialState, PocketState } from '../states/pocketsState';
import { PocketActions, UPDATE_POCKET } from '../actions/pocketActions';

export function pocketReducer(
    state = pocketInitialState,
    action: PocketActions
): PocketState {
    switch (action.type) {
        case UPDATE_POCKET:
            return {
                ...state,
                pocketList: state.pocketList.map(pocket => {
                    if (pocket.currency === action.payload.currency) {
                        return {
                            ...pocket,
                            balance: pocket.balance
                        }
                    } else {
                        return pocket
                    }
                })
            }
        default:
            return state
    }
}