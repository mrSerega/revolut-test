import React from 'react'
import { Spinner } from '../Spinner/Spinner';
import { ExchangeScreenContainer } from './ExchangeScreenContainer';

import './ExchnageScreenDataSource.css'

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
            return <div className={this.blockName + '__loading-plug'}>
                <div className={this.blockName + '__spinner'}>
                    <Spinner/>
                </div>
            </div>
        }

        if (!isRatesLading && !rates) {
            return <div className={this.blockName + '__error-plug'}>
                <div className={this.blockName + '__error-text'}>
                    ERROR<br/><br/>
                    Can't load exchange rates.<br/><br/>
                    Please reload page.
                </div>
            </div>
        }

        return <ExchangeScreenContainer/>
    }
}