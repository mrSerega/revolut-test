import { Currency } from '../typings/currency';

export const UPDATE_POCKET = 'UPDATE_POCKET'
export interface UpdatePocketPayload {
    currency: Currency,
    value: number
}
export interface UpdatePocketAction {
    type: typeof UPDATE_POCKET,
    payload: UpdatePocketPayload
}
export function updatePocket(payload: UpdatePocketPayload): UpdatePocketAction {
    return {
        type: UPDATE_POCKET,
        payload
    }
}

export type PocketActions =
    | UpdatePocketAction