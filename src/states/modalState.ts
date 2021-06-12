import { ModalKind } from '../typings/modals';
import { RootState } from './indexState';

export const modalInitialState: ModalState = {
    modalKind: null,
    message: undefined
}

export type ModalState = {
    modalKind: ModalKind
    message: string
} | {
    modalKind: null
    message: undefined
}

export class ModalSelector {
    static getCurrentModalKind = (state: RootState) => state.modals.modalKind
    static getModalMessage= (state: RootState) => state.modals.message
}