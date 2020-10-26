import { ModalKind } from '../typings/modals'

export const TOGGLE_MODAL = 'TOGGLE_MODAL'
export interface ToggleModalPayload {
    modalKind?: ModalKind
    message?: string
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