import React from 'react'
import { useSelector } from 'react-redux';
import { PocketSelector } from '../../states/pocketsState';
import { Currency } from '../../typings/currency';
import { Dashboard } from './Dashboard';

export const DashboardContainer: React.FC = () => {

    // TODO: get data from store

    const props = {
        name: 'Sergey',
        surname: 'Razumov',
        picUrl: 'http://example.com',
        pocketList: useSelector(PocketSelector.getPocketList),
        overallBalance: 1337,
        primaryCurrency: Currency.USD,
        relevantDate: new Date(),
    }

    return <Dashboard
        {...props}
    />
}