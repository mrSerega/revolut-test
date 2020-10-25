import React from 'react'
import { Spinner } from '../Spinner/Spinner';
import { ExchangeScreenContainer } from './ExchangeScreenContainer';

export interface ExchangeScreenDataSourceStateProps {
    rates: {
        [index: string]: {
            [index: string]: number
        }
    },
    isRatesLading: boolean;
    isRatesInitialized: boolean;
}

export interface ExchangeScreenDataSourceDispatchProps {
    startPollRates: () => void
}

export interface ExchangeScreenDataSourceOwnProps {

}

export type ExchangeScreenDataSourceProps =
    & ExchangeScreenDataSourceStateProps
    & ExchangeScreenDataSourceDispatchProps
    & ExchangeScreenDataSourceOwnProps

export class ExchangeScreenDataSource extends React.Component<ExchangeScreenDataSourceProps> {
    readonly blockName = 'exchange-screen-data-source'

    componentDidMount() {
        const {
            startPollRates
        }  = this.props
        startPollRates()
    }

    render() {
        const {
            rates,
            isRatesLading,
            isRatesInitialized
        } = this.props;

        if (isRatesLading && !rates || !isRatesInitialized) {
            console.log('loading')
            return <div className={this.blockName + '__loading-plug'}>
                <Spinner/>
            </div>
        }

        if (!isRatesLading && !rates) {
            console.log('error')
            return <div className={this.blockName + '__error-plug'}>
                Can't load exchange rates
            </div>
        }

        console.log('norm,')
        return <ExchangeScreenContainer/>
    }
}