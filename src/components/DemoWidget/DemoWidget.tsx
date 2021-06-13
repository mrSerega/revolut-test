import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DashboardContainer } from '../Dashboard/DashboardContainer';
import { ExchangeScreenDataSourceContainer } from '../ExchangeScreen/ExchnageScreenDataSourceContainer';
import { Layout } from '../Layout/Layout';
import { ModalIndexContainer } from '../ModalWindow/ModalIndexContainer';
import './DemoWidget.css'

export class DemoWidget extends React.Component {

    readonly blockName = 'demo-widget'

    render() {
        return <div className={this.blockName}>
            <BrowserRouter>
                <Layout>
                        <Switch>
                            <Route path="/dashboard">
                                <DashboardContainer/>
                            </Route>
                            <Route path="/wallet">
                                <ExchangeScreenDataSourceContainer/>
                            </Route>
                        </Switch>
                </Layout>
            </BrowserRouter>
            <ModalIndexContainer/>
        </div>
    }
}