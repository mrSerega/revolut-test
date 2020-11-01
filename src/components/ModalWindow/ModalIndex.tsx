import React from 'react';
import { ModalKind } from '../../typings/modals';
import { ModalWindow } from './ModalWindow';

export interface ModalIndexStateProps {
    modalKind?: ModalKind
    message?: string
}

export interface ModalIndexDispatchProps {
    onClose: () => void;
}

export type ModalIndexProps =
    & ModalIndexStateProps
    & ModalIndexDispatchProps

export class ModalIndex extends React.Component<ModalIndexProps> {
    readonly = 'modal-index'

    render() {
        const {
            modalKind,
            onClose,
            message
        } = this.props

        if (!modalKind) {
            return null
        }

        switch (modalKind) {
            case ModalKind.ErrorModal:
            default:
                return <ModalWindow
                    onClose={onClose}
                    message={message || ''}
                />
        }
    }
}