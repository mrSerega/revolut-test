import { connect } from 'react-redux';
import { ExchangeScreen, ExchangeScreenStateProps, ExchangeScreenDispatchProps, ExchangeScreenOwnProps } from './ExchangeScreen';
import { RootState } from '../../states/indexState';
import { Dispatch } from 'redux';
import { PocketSelector } from '../../states/pocketsState';
import { sendExchange } from '../../actions/exchangeActions';
import { ExchangeSelector } from '../../states/exchangeState';
import { Currency } from '../../typings/currency';

const mapStateToProps = (state: RootState, ownProps: ExchangeScreenOwnProps): ExchangeScreenStateProps => {
    const exchangeRate = ExchangeSelector.getRate(state)

    if (exchangeRate === undefined) {
        throw new Error(`there are no exchange rate`)
    }

    return {
        rate: exchangeRate,
        isExchangeLoading: state.exchange.isExchangeLoading,
        pocketList: state.pockets.pocketList
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ExchangeScreenOwnProps): ExchangeScreenDispatchProps => ({
    onExchange: (
        fromValue: number,
        fromCurrency: Currency,
        toCurrency: Currency
    ) => dispatch(sendExchange({
        fromValue,
        fromCurrency,
        toCurrency,
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