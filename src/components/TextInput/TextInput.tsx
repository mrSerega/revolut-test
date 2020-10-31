import React, { ChangeEvent } from 'react'

import './TextInput.css'

export interface TextInputProps {
    value: string
    onChange: (value: string) => void;
    tabIndex?: number
    autoFocus?: boolean;
    placeholder?: string
    isFrom?: boolean
}

const floatRegExp = /^(\d*)\.?(\d{1,2})?$/

export class TextInput extends React.Component<TextInputProps> {
    readonly blockName = 'text-input'

    render() {

        const {
            value,
            tabIndex,
            autoFocus = false,
            placeholder,
            isFrom
        } = this.props

        return <div className={this.blockName}>
            {isFrom && <div className={
                this.blockName + '__view' + ' ' +
                this.blockName + '__view' + (!value ? '_empty' : '')
            }>
                {value}
            </div>}
            <input
                autoFocus={autoFocus}
                tabIndex={tabIndex}
                type="text"
                className={this.blockName + '__input'}
                value={value || ''}
                onChange={this.handleChange}
            />
            <div className={this.blockName + '__placeholder'}>
                {!value ? placeholder : ""}
            </div>
        </div>
    }

    private handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const {
            onChange
        } = this.props

        const val = evt.target.value

        if (floatRegExp.test(val)) {
            onChange(val)
        }
    }
}