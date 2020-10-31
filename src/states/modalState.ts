import { ModalKind } from '../typings/modals';
import { RootState } from './indexState';

export const modalInitialState: ModalState = {
    modalKind: undefined,
    message: undefined
}

export interface ModalState {
    modalKind?: ModalKind
    message?: string
}

export class ModalSelector {
    static getCurrentModalKind = (state: RootState) => state.modals.modalKind
    static getModalMessage= (state: RootState) => state.modals.message
}