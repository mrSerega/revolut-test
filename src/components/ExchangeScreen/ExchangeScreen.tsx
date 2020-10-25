import React from 'react';
import { Currency, CurrencySymbolMapper } from '../../typings/currency';
import { CurrencyInput } from '../CurrencyInput/CurrencyInput';
import { Spinner } from '../Spinner/Spinner';

import './ExchangeScreen.css'

export interface ExchangeScreenStateProps {
    rates: {
        [index: string]: {
            [index: string]: number
        }
    };
    isExchangeLoading: boolean;
    pocketList: {
        currency: Currency,
        balance: number
    }[]
}

export interface ExchangeScreenDispatchProps {
    onExchange: (
        fromValue: number,
        fromCurrency: Currency,
        toCurrency: Currency
    ) => void;
}

export interface ExchangeScreenOwnProps {}

export type ExchangeScreenProps =
    & ExchangeScreenStateProps
    & ExchangeScreenDispatchProps
    & ExchangeScreenOwnProps

export interface ExchangeScreenState {
    fromValue: string
    toValue: string
    fromCurrency: Currency
    toCurrency: Currency
}

export class ExchangeScreen extends React.Component<
    ExchangeScreenProps,
    ExchangeScreenState
> {

    readonly blockName = 'exchange-screen'

    state: ExchangeScreenState = {
        fromValue: '',
        toValue:  '',
        fromCurrency: Currency.GBP,
        toCurrency: Currency.USD
    }

    render() {

        const {
            rates,
            isExchangeLoading,
            pocketList,
        } = this.props

        const {
            fromCurrency,
            toCurrency,
            fromValue,
            toValue
        } = this.state

        return <div className={this.blockName}>
            <div className={this.blockName + '__header'}>
                <div className={this.blockName + '__cancel'}>
                    Cancel
                </div>
                <div className={this.blockName + '__rate'}>
                    {`${CurrencySymbolMapper[fromCurrency]}1 = ${CurrencySymbolMapper[toCurrency]}${this.getRate().toFixed(2)}`}
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
                    balance={this.getFromBalance()}
                    tabIndex={1}
                    autoFocus
                    isFrom
                    value={fromValue}
                    onChange={this.handleChangeFromValue}
                    error={this.getFromError()}
                    pocketList={pocketList.map(p => p.currency)} // FIXME:
                    onLeft={this.handleLeftFrom}
                    onRight={this.handleRightFrom}
                />
            </div>
            <div className={this.blockName + '__to'}>
                <CurrencyInput
                    currency={toCurrency}
                    balance={this.getToBalance()}
                    tabIndex={2}
                    value={toValue}
                    onChange={this.handleChangeToValue}
                    subtitle={this.getToRateString()}
                    pocketList={pocketList.map(p => p.currency)} // FIXME:
                    onLeft={this.handleLeftTo}
                    onRight={this.handleRightTo}
                />
            </div>
            {isExchangeLoading && <div className={this.blockName + '__cover'}>
                <div className={this.blockName + '__spinner'}>
                    <Spinner/>
                </div>
            </div>}
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

        const from = Number.parseFloat(fromValue)

        if(!Number.isNaN(from)) {
            const to = (from * this.getRate()).toFixed(2)
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


        const to = Number.parseFloat(toValue)

        if(!Number.isNaN(to)) {
            const from = (to * 1.0 / this.getRate()).toFixed(2)
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
            fromValue,
            fromCurrency,
            toCurrency
        } = this.state

        const fromV = Number.parseFloat(fromValue)

        !this.isExchangeDisabled() && onExchange(
            fromV,
            fromCurrency,
            toCurrency
        )
    }

    private getToRateString = () => {

        const {
            toCurrency,
            fromCurrency,
        } = this.state

        return `${CurrencySymbolMapper[toCurrency]}1 = ${CurrencySymbolMapper[fromCurrency]}${(1.0/this.getRate()).toFixed(2)}`
    }

    private getFromError = () => {
        const {
            fromValue
        } = this.state

        const {
            fromCurrency,
            toCurrency
        } = this.state

        if (fromCurrency === toCurrency) {
            return 'same currencies'
        }

        const from = Number.parseFloat(fromValue)

        if (!Number.isNaN(from) && from > this.getFromBalance()) {
            return 'insufficient funds'
        }

        return undefined
    }

    private isExchangeDisabled = () => {

        const {
            fromValue,
            fromCurrency,
            toCurrency
        } = this.state

        const {
            isExchangeLoading,
        } = this.props;

        const from = Number.parseFloat(fromValue)

        return !!(
            this.getFromError() ||
            Number.isNaN(from) ||
            from <= 0 ||
            isExchangeLoading ||
            fromCurrency === toCurrency
        )
    }

    private handleLeftFrom = () => {
        const {
            fromCurrency
        } = this.state

        const {
            pocketList
        } = this.props;

        let fromCurrencyIndex = pocketList.findIndex(p => p.currency === fromCurrency) -1
        if (fromCurrencyIndex < 0) {
            fromCurrencyIndex = pocketList.length -1
        }

        this.setState({
            fromCurrency: pocketList[fromCurrencyIndex].currency
        })
    }

    private handleRightFrom = () => {
        const {
            fromCurrency
        } = this.state

        const {
            pocketList
        } = this.props;

        let fromCurrencyIndex = pocketList.findIndex(p => p.currency === fromCurrency) + 1
        if (fromCurrencyIndex > pocketList.length - 1) {
            fromCurrencyIndex = 0
        }

        this.setState({
            fromCurrency: pocketList[fromCurrencyIndex].currency
        })
    }

    private handleLeftTo = () => {
        const {
            toCurrency
        } = this.state

        const {
            pocketList
        } = this.props;

        let toCurrencyIndex = pocketList.findIndex(p => p.currency === toCurrency) -1
        if (toCurrencyIndex < 0) {
            toCurrencyIndex = pocketList.length -1
        }

        this.setState({
            toCurrency: pocketList[toCurrencyIndex].currency
        })
    }

    private handleRightTo = () => {
        const {
            toCurrency
        } = this.state

        const {
            pocketList
        } = this.props;

        let toCurrencyIndex = pocketList.findIndex(p => p.currency === toCurrency) + 1
        if (toCurrencyIndex > pocketList.length - 1) {
            toCurrencyIndex = 0
        }

        this.setState({
            toCurrency: pocketList[toCurrencyIndex].currency
        })
    }

    private getFromBalance = () => {
        const {
            fromCurrency
        } = this.state

        const {
            pocketList
        } = this.props

        const fromPocket = pocketList.find(p => p.currency === fromCurrency)

        if (!fromPocket) {
            throw new Error(`there isn't ${fromCurrency} pocket`)
        }

        return fromPocket.balance
    }

    private getToBalance = () => {
        const {
            toCurrency
        } = this.state

        const {
            pocketList
        } = this.props

        const toPocket = pocketList.find(p => p.currency === toCurrency)

        if (!toPocket) {
            throw new Error(`there isn't ${toCurrency} pocket`)
        }

        return toPocket.balance
    }

    private getRate = () => {
        const {
            rates,
        } = this.props

        const {
            fromCurrency,
            toCurrency
        } = this.state

        const currentRates = rates[fromCurrency]

        if (!currentRates) {
            throw new Error(`There isn't exchange rate for ${fromCurrency}`)
        }

        const rate = currentRates[toCurrency]

        if (typeof rate !== 'number') {
            throw new Error(`There isn't exchange rate for ${fromCurrency} -> ${toCurrency}`)
        }

        return rate
    }
}