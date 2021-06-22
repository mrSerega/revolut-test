import { ModalKind } from '../typings/modals'

export const TOGGLE_MODAL = 'TOGGLE_MODAL'

export type ToggleModalPayload = {
    modalKind: ModalKind.ErrorModal
    message: string
} | {
    modalKind: ModalKind.CommonModal
    message: string // TODO: use react element
} | {
    modalKind: null
}

export interface ToggleModalAction {
    type: typeof TOGGLE_MODAL,
    payload: ToggleModalPayload
}
export function toggleModal(payload: ToggleModalPayload): ToggleModalAction {
    return {
        type: TOGGLE_MODAL,
        payload
    }
}

export type ModalsActions =
    | ToggleModalAction