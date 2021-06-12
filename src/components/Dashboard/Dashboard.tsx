import React from 'react'

import { Currency, CurrencySymbolMapper } from '../../typings/currency';
import { Pocket } from '../../typings/pocket';

export interface DashboardProps {
    name: string
    surname: string
    picUrl: string
    pocketList: Pocket[]
    overallBalance: number
    primaryCurrency: Currency,
    relevantDate: Date
}

const className = 'dashboard'

const Header: React.FC<DashboardProps> = ({
    name,
    surname,
    picUrl
}: DashboardProps) => {
    return  <div className={className + '__header'}>
        <div className={className + '__login'}>
            <div className={className + '__name'}>
                {name + ' '}
            </div>
            <div className={className + '__surname'}>
                {surname[0] + '.'}
            </div>
        </div>
        <div className={className + '__userpick'}>
            {picUrl /* TODO: use real pick */}
        </div>
    </div>
}

const Balance: React.FC<DashboardProps> = ({
    pocketList,
    primaryCurrency,
    overallBalance,
    relevantDate
}: DashboardProps) => {
    return <div className={className + '__balance'}>
        <div className={className + '__currency-list'}>
            {pocketList.map(({currency, balance}) => <div
                className={className + '__currency-item'}
                key={`currency-item-${currency}`}
            >
                <b>{`${CurrencySymbolMapper[currency]}: `}</b>{balance}
            </div>)}
        </div>
        <div className={className + '__overall'}>
            <div className={className + '__overall-value'}>
                <b>Overall: </b>{`${CurrencySymbolMapper[primaryCurrency]}${overallBalance}`}
            </div>
            <div className={className + '__overall-relevant'}>
                {`relevant on ${relevantDate}`}
            </div>
        </div>
    </div>
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
    return <div className={className}>
        <Header {...props} />
        <Balance {...props} />
    </div>
}