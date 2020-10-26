import React from 'react';
import { ModalKind } from '../../typings/modals';
import { ModalWindow } from './ModalWindow';

export interface ModalIndexStateProps {
    modalKind?: ModalKind
}

export interface ModalIndexDispatchProps {
    onClose: () => void;
}

export interface ModalIndexOwnProps {}

export type ModalIndexProps =
    & ModalIndexStateProps
    & ModalIndexDispatchProps
    & ModalIndexOwnProps

export class ModalIndex extends React.Component<ModalIndexProps> {
    readonly = 'modal-index'

    render() {
        const {
            modalKind,
            onClose
        } = this.props

        if (!modalKind) {
            return null
        }

        switch (modalKind) {
            case ModalKind.ErrorModal:
            default:
                return <ModalWindow
                    onClose={onClose}
                />
        }
    }
}