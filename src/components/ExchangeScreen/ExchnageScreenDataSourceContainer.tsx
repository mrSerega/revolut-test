import { connect } from 'react-redux';
import { RootState } from '../../states/indexState';
import { Dispatch } from 'redux';
import { startPollRate } from '../../actions/exchangeActions';
import { ExchangeSelector } from '../../states/exchangeState';
import { ExchangeScreenDataSource, ExchangeScreenDataSourceDispatchProps, ExchangeScreenDataSourceStateProps } from './ExchnageScreenDataSource';

const mapStateToProps = (state: RootState): ExchangeScreenDataSourceStateProps => {
    const rates = ExchangeSelector.getRate(state)
    const flags = ExchangeSelector.getFlags(state)

    return {
        rates,
        isRatesInitialized: flags.isRatesInitialized,
        isRatesLading: flags.isRatesLoading
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ExchangeScreenDataSourceDispatchProps => ({
    startPollRates: () => dispatch(startPollRate())
})

export const ExchangeScreenDataSourceContainer = connect<
    ExchangeScreenDataSourceStateProps,
    ExchangeScreenDataSourceDispatchProps,
    {},
    RootState
>(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeScreenDataSource)