import React from 'react';
import { Currency } from '../../typings/currency';
import { CurrencyInput } from '../CurrencyInput/CurrencyInput';

export interface ExchangeScreenStateProps {
    fromBalance: number;
    toBalance: number
}

export interface ExchangeScreenDispatchProps {}

export interface ExchangeScreenOwnProps {
    fromCurrency: Currency
    toCurrency: Currency
}

export type ExchangeScreenProps =
    & ExchangeScreenStateProps
    & ExchangeScreenDispatchProps
    & ExchangeScreenOwnProps

export class ExchangeScreen extends React.Component<ExchangeScreenProps> {

    readonly blockName = 'exchange-screen'

    render() {

        const {
            fromCurrency,
            fromBalance,
            toCurrency,
            toBalance
        } = this.props

        return <div className={this.blockName}>
            <div className={this.blockName + '__header'}>
            </div>
            <div className={this.blockName + '__from'}>
                <CurrencyInput
                    currency={fromCurrency}
                    balance={fromBalance}
                />
            </div>
            <div className={this.blockName + '__to'}>
                <CurrencyInput
                    currency={toCurrency}
                    balance={toBalance}
                />
            </div>
        </div>
    }
}