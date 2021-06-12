import React from 'react';
import { ModalKind } from '../../typings/modals';
import { ModalWindow } from './ModalWindow';

export interface ModalIndexStateProps {
    modalKind: ModalKind | null
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
            case ModalKind.CommonModal:
                return <ModalWindow
                    onClose={onClose}
                    message="CommonModal"
                />
            case ModalKind.ErrorModal:
                return <ModalWindow
                    onClose={onClose}
                    message={message || ''}
                />
            default:
                const unknownModalKind: never = modalKind
                throw new Error(`Unknown modal kind: ${unknownModalKind}`)
        }
    }
}