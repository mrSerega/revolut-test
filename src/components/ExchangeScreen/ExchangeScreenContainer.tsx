import { connect } from 'react-redux';
import { ExchangeScreen, ExchangeScreenStateProps, ExchangeScreenDispatchProps, ExchangeScreenOwnProps } from './ExchangeScreen';
import { RootState } from '../../states/indexState';
import { Dispatch } from 'redux';
import { PocketSelector } from '../../states/pocketsState';
import { sendExchange } from '../../actions/exchangeActions';
import { ExchangeSelector } from '../../states/exchangeState';

const mapStateToProps = (state: RootState, ownProps: ExchangeScreenOwnProps): ExchangeScreenStateProps => {
    const {
        fromCurrency,
        toCurrency
    } = ownProps

    const fromPocket = PocketSelector.getPocket(fromCurrency)(state)

    if (fromPocket === undefined) {
        throw new Error(`there are no ${fromCurrency} pocket`)
    }

    const toPocket = PocketSelector.getPocket(toCurrency)(state)

    if (toPocket === undefined) {
        throw new Error(`there are no ${toCurrency} pocket`)
    }

    const exchangeRate = ExchangeSelector.getRate(state)

    if (exchangeRate === undefined) {
        throw new Error(`there are no exchange rate`)
    }

    return {
        fromBalance: fromPocket.balance,
        toBalance: toPocket.balance,
        rate: exchangeRate
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ExchangeScreenOwnProps): ExchangeScreenDispatchProps => ({
    onExchange: (fromValue: number) => dispatch(sendExchange({
        fromValue,
        fromCurrency: ownProps.fromCurrency,
        toCurrency: ownProps.toCurrency
    }))
})

export const ExchangeScreenContainer = connect<
    ExchangeScreenStateProps,
    ExchangeScreenDispatchProps,
    ExchangeScreenOwnProps,
    RootState
>(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeScreen)