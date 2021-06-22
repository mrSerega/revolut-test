import { Currency } from '../typings/currency';
import { modalInitialState } from '../states/modalState';
import { ModalKind } from '../typings/modals';
import { toggleModal } from '../actions/modalActions';
import { modalReducer } from './modalReducer';

describe('modal reducer', () => {
    it ('should handle TOGGLE_MODAL', () => {
        expect(
            modalReducer(
                modalInitialState,
                toggleModal({
                    modalKind: ModalKind.ErrorModal,
                    message: "message",
                })
            )
        ).toEqual({
            ...modalInitialState,
            modalKind: ModalKind.ErrorModal,
            message: "message"
        })
    })
    it ('should close modal', () => {
        expect(
            modalReducer(
                modalInitialState,
                toggleModal({modalKind: null})
            )
        ).toEqual(
            modalInitialState,
        )
    })
})