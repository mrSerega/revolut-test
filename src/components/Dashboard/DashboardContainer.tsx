import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { startPollRate } from '../../actions/exchangeActions';
import { useModal } from '../../hooks/useModal';
import { ExchangeSelector } from '../../states/exchangeState';
import { PocketSelector } from '../../states/pocketsState';
import { Currency } from '../../typings/currency';
import { ModalKind } from '../../typings/modals';
import { Dashboard } from './Dashboard';
import { Spinner } from '../Spinner/Spinner';

export const DashboardContainer: React.FC = () => {

    const dispatch = useDispatch()

    const {
        isRatesLoading,
        isRatesInitialized
    } = useSelector(ExchangeSelector.getFlags)

    const rates = useSelector(ExchangeSelector.getRate);

    useEffect(() => {
        dispatch(startPollRate())
    }, []);

    const primaryCurrency = Currency.EUR;
    const pocketList = useSelector(PocketSelector.getPocketList);

    const {
        openModal: onUserPickClick
    } = useModal({
        modalKind: ModalKind.CommonModal,
        message: 'Just a hook modal example.'
    })

    if (isRatesLoading && !rates || !isRatesInitialized) {
        return <Spinner/>
    }

    if (!isRatesLoading && !rates) {
        return  <div>
            ERROR<br/><br/>
            Can't load exchange rates.<br/><br/>
            Please reload page.
        </div>
    }

    const rate = rates[primaryCurrency]

    let overallBalance = 0
    pocketList.forEach(pocket => {
        overallBalance += rate[pocket.currency] * pocket.balance
    })

    const props = {
        name: 'Sergey',
        surname: 'Razumov',
        picUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a9/a9460ab87dfbe554e9986e65a6f3121e6b714c48.jpg',
        pocketList,
        overallBalance,
        primaryCurrency,
        relevantDate: new Date(),
        onUserPickClick
    }



    return <Dashboard
        {...props}
    />
}