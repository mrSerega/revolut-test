import { modalInitialState, ModalState } from '../states/modalState';
import { ModalsActions, TOGGLE_MODAL } from '../actions/modalActions';
export function modalReducer(
    state = modalInitialState,
    action: ModalsActions
): ModalState {
    switch (action.type) {
        case TOGGLE_MODAL:
            switch(action.payload.modalKind) {
                case null:
                    return {
                        ...state,
                        modalKind: null,
                        message: undefined
                    }
                default:
                    return {
                        ...state,
                        modalKind: action.payload.modalKind,
                        message: action.payload.message
                    }
            }
        default:
            return state
    }
}