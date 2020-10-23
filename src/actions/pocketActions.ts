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
export function updatePocket(params: UpdatePocketPayload): UpdatePocketAction {
    return {
        type: UPDATE_POCKET,
        payload: params
    }
}

export type PocketActions =
    | UpdatePocketAction