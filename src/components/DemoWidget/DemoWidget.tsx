import React from 'react';
import { ExchangeScreenDataSourceContainer } from '../ExchangeScreen/ExchnageScreenDataSourceContainer';
import { ModalIndexContainer } from '../ModalWindow/ModalIndexContainer';
import './DemoWidget.css'

export interface DemoWidgetProps {}

export class DemoWidget extends React.Component<DemoWidgetProps> {

    readonly blockName = 'demo-widget'

    render() {
        return <div className={this.blockName}>
            <ExchangeScreenDataSourceContainer/>
            <ModalIndexContainer/>
        </div>
    }
}