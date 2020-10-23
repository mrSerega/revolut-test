import React from 'react';
import { Currency, CurrencyNameMapper, CurrencySymbolMapper } from '../../typings/currency';
import { TextInput } from '../TextInput/TextInput';

export interface CurrencyInputProps {
    currency: Currency,
    balance: number
}

export class CurrencyInput extends React.Component<CurrencyInputProps> {
    readonly blockName = 'currency-input'

    render() {

        const {
            currency,
            balance
        } = this.props

        return <div className={this.blockName}>
            <div className={this.blockName + '__top'}>
                <div className={this.blockName + '__currency'}>
                    {CurrencyNameMapper[currency]}
                </div>
                <TextInput/>
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
}