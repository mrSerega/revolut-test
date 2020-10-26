import { modalInitialState, ModalState } from '../states/modalState';
import { ModalsActions, TOGGLE_MODAL } from '../actions/modalActions';
export function modalReducer(
    state = modalInitialState,
    action: ModalsActions
): ModalState {
    switch (action.type) {
        case TOGGLE_MODAL:
            return {
                ...state,
                modalKind: action.payload.modalKind
            }
        default:
            return state
    }
}