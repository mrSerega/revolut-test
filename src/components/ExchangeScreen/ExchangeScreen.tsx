import React from 'react';
import { Currency, CurrencySymbolMapper } from '../../typings/currency';
import { CurrencyInput } from '../CurrencyInput/CurrencyInput';

import './ExchangeScreen.css'

export interface ExchangeScreenStateProps {
    fromBalance: number;
    toBalance: number
    rate: number
}

export interface ExchangeScreenDispatchProps {
    onExchange: (fromValue: number) => void;
}

export interface ExchangeScreenOwnProps {
    fromCurrency: Currency
    toCurrency: Currency
}

export type ExchangeScreenProps =
    & ExchangeScreenStateProps
    & ExchangeScreenDispatchProps
    & ExchangeScreenOwnProps

export interface ExchangeScreenState {
    fromValue: string
    toValue: string
}

export class ExchangeScreen extends React.Component<
    ExchangeScreenProps,
    ExchangeScreenState
> {

    readonly blockName = 'exchange-screen'

    state: ExchangeScreenState = {
        fromValue: '',
        toValue:  ''
    }

    render() {

        const {
            fromCurrency,
            fromBalance,
            toCurrency,
            toBalance,
            rate
        } = this.props

        const {
            fromValue,
            toValue
        } = this.state

        return <div className={this.blockName}>
            <div className={this.blockName + '__header'}>
                <div className={this.blockName + '__cancel'}>
                    Cancel
                </div>
                <div
                    className={
                        this.blockName + '__exchange' + ' ' +
                        this.blockName + '__exchange' + (this.isExchangeDisabled() ? '_disabled' : '')
                    }
                    onClick={this.handleExchange}
                >
                    Exchange
                </div>
            </div>
            <div className={this.blockName + '__from'}>
                <CurrencyInput
                    currency={fromCurrency}
                    balance={fromBalance}
                    tabIndex={1}
                    autoFocus
                    isFrom
                    value={fromValue}
                    onChange={this.handleChangeFromValue}
                    error={this.getFromError()}
                />
            </div>
            <div className={this.blockName + '__to'}>
                <CurrencyInput
                    currency={toCurrency}
                    balance={toBalance}
                    tabIndex={2}
                    value={toValue}
                    onChange={this.handleChangeToValue}
                    subtitle={this.getToRateString()}
                />
            </div>
        </div>
    }

    private handleChangeFromValue = (fromValue?: string) => {

        if (!fromValue) {
            this.setState({
                fromValue: '',
                toValue: ''
            })
            return
        }

        const {
            rate
        } = this.props

        const from = Number.parseFloat(fromValue)

        if(!Number.isNaN(from)) {
            const to = (from * rate).toFixed(2)
            this.setState({
                fromValue: fromValue,
                toValue: to.toString()
            })
            return
        }

        throw new Error(`from value ${fromValue} is not a Number`)
    }

    private handleChangeToValue = (toValue?: string) => {

        if (!toValue) {
            this.setState({
                fromValue: '',
                toValue: ''
            })
            return
        }

        const {
            rate
        } = this.props

        const to = Number.parseFloat(toValue)

        if(!Number.isNaN(to)) {
            const from = (to * 1.0 / rate).toFixed(2)
            this.setState({
                fromValue: from.toString(),
                toValue: toValue
            })
            return
        }

        throw new Error(`from value ${toValue} is not a Number`)
    }

    private handleExchange = () => {
        const {
            onExchange
        } = this.props

        const {
            fromValue
        } = this.state

        const from = Number.parseFloat(fromValue)

        !this.isExchangeDisabled() && onExchange(from)
    }

    private getToRateString = () => {
        const {
            toCurrency,
            fromCurrency,
            rate
        } = this.props

        return `${CurrencySymbolMapper[toCurrency]}1 = ${CurrencySymbolMapper[fromCurrency]}${(1.0/rate).toFixed(2)}`
    }

    private getFromError = () => {
        const {
            fromBalance
        } = this.props

        const {
            fromValue
        } = this.state

        const from = Number.parseFloat(fromValue)

        if (!Number.isNaN(from) && from > fromBalance) {
            return 'insufficient funds'
        }

        return undefined
    }

    private isExchangeDisabled = () => {

        const {
            fromValue
        } = this.state

        const from = Number.parseFloat(fromValue)

        return !!(this.getFromError() || Number.isNaN(from) || from <= 0)
    }
}