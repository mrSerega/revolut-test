import React from 'react';
import { Currency, CurrencyNameMapper, CurrencySymbolMapper } from '../../typings/currency';
import { TextInput } from '../TextInput/TextInput';

import './CurrencyInput.css'

export interface CurrencyInputProps {
    currency: Currency,
    balance: number,
    tabIndex?: number
    autoFocus?: boolean
    isFrom?: boolean
    value: string
    onChange: (value: string) => void
    subtitle?: string
    error?: string
}

export class CurrencyInput extends React.Component<CurrencyInputProps> {
    readonly blockName = 'currency-input'

    render() {

        const {
            currency,
            balance,
            tabIndex,
            autoFocus = false,
            isFrom = false,
            value,
            subtitle,
            error
        } = this.props

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
                    isFrom={isFrom}
                />
            </div>
            <div className={this.blockName + '__bottom'}>
                <div className={this.blockName + '__balance'}>
                    You have {CurrencySymbolMapper[currency]}{balance}
                </div>
                <div className={
                    this.blockName + '__subtitle' + ' ' +
                    this.blockName + '__subtitle' + (error ? '_error' : '')
                }>
                    {error || subtitle}
                </div>
            </div>
        </div>
    }

    private handleChangeValue = (value: string) => {
        const {
            onChange
        } = this.props

        onChange && onChange(value)
    }
}