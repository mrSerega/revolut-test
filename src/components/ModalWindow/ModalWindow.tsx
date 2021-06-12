import React from 'react';

import './ModalWindow.css'

export interface ModalWindowOwnProps {
    onClose: () => void;
    message: string
}

export type ModalWindowProps =
    & ModalWindowOwnProps

export class ModalWindow extends React.Component<ModalWindowProps> {
    readonly blockName = 'modal-window'

    componentDidMount() {
        window.addEventListener('keydown', this.focusLockListener);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.focusLockListener)
    }


    render(){

        const {
            onClose,
            message
        } = this.props

        return <div className={this.blockName + '__cover'}>
            <div className={this.blockName + '__error-dialog'}>
                <div className={this.blockName + '__error-title'}>
                    Oops!
                </div>
                <div className={this.blockName + '__error-content'}>
                    {message}
                </div>
                <div className={this.blockName + '__error-footer'}>
                    <div
                        className={
                            this.blockName + '__button'
                        }
                        onClick={onClose}
                    >
                        OK
                    </div>
                </div>
            </div>
        </div>
    }

    private focusLockListener = (evt: KeyboardEvent) => {
        if (evt.key === 'Tab') {
            evt.preventDefault();
        }
    }
}