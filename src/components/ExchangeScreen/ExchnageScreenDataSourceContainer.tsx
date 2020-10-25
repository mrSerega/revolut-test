import { connect } from 'react-redux';
import { RootState } from '../../states/indexState';
import { Dispatch } from 'redux';
import { sendExchange, startPollRate } from '../../actions/exchangeActions';
import { ExchangeSelector } from '../../states/exchangeState';
import { Currency } from '../../typings/currency';
import { ExchangeScreenDataSource, ExchangeScreenDataSourceDispatchProps, ExchangeScreenDataSourceOwnProps, ExchangeScreenDataSourceStateProps } from './ExchnageScreenDataSource';

const mapStateToProps = (state: RootState, ownProps: ExchangeScreenDataSourceOwnProps): ExchangeScreenDataSourceStateProps => {
    const rates = ExchangeSelector.getRate(state)
    const flags = ExchangeSelector.getFlags(state)

    return {
        rates,
        isRatesInitialized: flags.isRatesInitialized,
        isRatesLading: flags.isRatesLoading
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ExchangeScreenDataSourceOwnProps): ExchangeScreenDataSourceDispatchProps => ({
    startPollRates: () => dispatch(startPollRate())
})

export const ExchangeScreenDataSourceContainer = connect<
    ExchangeScreenDataSourceStateProps,
    ExchangeScreenDataSourceDispatchProps,
    ExchangeScreenDataSourceOwnProps,
    RootState
>(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeScreenDataSource)