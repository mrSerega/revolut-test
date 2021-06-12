import React from 'react';
import { DashboardContainer } from '../Dashboard/DashboardContainer';
import { ExchangeScreenDataSourceContainer } from '../ExchangeScreen/ExchnageScreenDataSourceContainer';
import { ModalIndexContainer } from '../ModalWindow/ModalIndexContainer';
import './DemoWidget.css'

export class DemoWidget extends React.Component {

    readonly blockName = 'demo-widget'

    render() {
        return <div className={this.blockName}>
            <DashboardContainer/>
            <ExchangeScreenDataSourceContainer/>
            <ModalIndexContainer/>
        </div>
    }
}