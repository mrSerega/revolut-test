import React from 'react';
import { Currency, CurrencyNameMapper, CurrencySymbolMapper } from '../../typings/currency';
import { TextInput } from '../TextInput/TextInput';

import './CurrencyInput.css'

export interface CurrencyInputProps {
    currency: Currency,
    balance: number,
    tabIndex?: number
    autoFocus?: boolean
}

export interface CurrencyInputState {
    value: string
}

export class CurrencyInput extends React.Component<
    CurrencyInputProps,
    CurrencyInputState
> {
    readonly blockName = 'currency-input'

    state: CurrencyInputState = {
        value: ''
    }

    render() {

        const {
            currency,
            balance,
            tabIndex,
            autoFocus = false
        } = this.props

        const {
            value
        } = this.state

        return <div className={this.blockName}>
            <div className={this.blockName + '__top'}>
                <div className={this.blockName + '__currency'}>
                    {CurrencyNameMapper[currency]}
                </div>
                <TextInput
                    value={value}
                    onChange={this.handleChangeValue}
                    tabIndex={tabIndex}
                    autoFocus={autoFocus}
                    placeholder="00.00"
                />
            </div>
            <div className={this.blockName + '__bottom'}>
                <div className={this.blockName + '__balance'}>
                    You have {CurrencySymbolMapper[currency]}{balance}
                </div>
                <div className={this.blockName + '__rate'}>
                </div>
            </div>
        </div>
    }

    private handleChangeValue = (value: string) => {
        console.log('setSate', value)
        this.setState({value})
    }
}