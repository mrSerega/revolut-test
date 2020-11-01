import React from 'react';
import { ExchangeScreenDataSourceContainer } from '../ExchangeScreen/ExchnageScreenDataSourceContainer';
import { ModalIndexContainer } from '../ModalWindow/ModalIndexContainer';
import './DemoWidget.css'

export class DemoWidget extends React.Component {

    readonly blockName = 'demo-widget'

    render() {
        return <div className={this.blockName}>
            <ExchangeScreenDataSourceContainer/>
            <ModalIndexContainer/>
        </div>
    }
}