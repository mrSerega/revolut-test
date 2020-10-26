import { ModalKind } from '../typings/modals';
import { RootState } from './indexState';

export const modalInitialState: ModalState = {
    modalKind: undefined
}

export interface ModalState {
    modalKind?: ModalKind
}

export class ModalSelector {
    static getCurrentModalKind = (state: RootState) => state.modals.modalKind
}