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
    isRatesLoading: boolean;
    isRatesInitialized: boolean;
}

export interface ExchangeScreenDataSourceDispatchProps {
    startPollRates: () => void
}

export type ExchangeScreenDataSourceProps =
    & ExchangeScreenDataSourceStateProps
    & ExchangeScreenDataSourceDispatchProps

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
            isRatesLoading,
            isRatesInitialized
        } = this.props;

        if (isRatesLoading && !rates || !isRatesInitialized) {
            return <div className={this.blockName + '__loading-plug'}>
                <div className={this.blockName + '__spinner'}>
                    <Spinner/>
                </div>
            </div>
        }

        if (!isRatesLoading && !rates) {
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