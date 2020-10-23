import { connect } from 'react-redux';
import { ExchangeScreen, ExchangeScreenStateProps, ExchangeScreenDispatchProps, ExchangeScreenOwnProps } from './ExchangeScreen';
import { RootState } from '../../states/indexState';
import { Dispatch } from 'redux';
import { PocketSelector } from '../../states/pocketsState';

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

    return {
        fromBalance: fromPocket.balance,
        toBalance: toPocket.balance
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ExchangeScreenOwnProps): ExchangeScreenDispatchProps => ({})

export const ExchangeScreenContainer = connect<
    ExchangeScreenStateProps,
    ExchangeScreenDispatchProps,
    ExchangeScreenOwnProps,
    RootState
>(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeScreen)