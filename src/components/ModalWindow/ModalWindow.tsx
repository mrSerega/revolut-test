import React from 'react';

import './ModalWindow.css'

export interface ModalWindowStateProps {}

export interface ModalWindowDispatchProps {}

export interface ModalWindowOwnProps {
    onClose: () => void;
}

export type ModalWindowProps =
    & ModalWindowStateProps
    & ModalWindowDispatchProps
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
            onClose
        } = this.props

        return <div className={this.blockName + '__cover'}>
            <div className={this.blockName + '__error-dialog'}>
                <div className={this.blockName + '__error-title'}>
                    Oops!
                </div>
                <div className={this.blockName + '__error-content'}>
                    Please try again.<br/>
                    Mock server generate random errors :)
                </div>
                <div className={this.blockName + '__error-footer'}>
                    <div
                        className={
                            this.blockName + '__button' + ' '
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