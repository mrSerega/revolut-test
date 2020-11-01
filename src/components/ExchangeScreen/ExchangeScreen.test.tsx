import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ExchangeScreen } from './ExchangeScreen';
import { Currency } from '../../typings/currency';
import { CurrencyInput } from '../CurrencyInput/CurrencyInput';
import React from 'react';

configure({ adapter: new Adapter() })

test('Exchange screen', () => {

    const testExchange = jest.fn()

    const cmp = shallow(<ExchangeScreen
        rates={{
            [Currency.USD]: {
                [Currency.EUR]: 1.1,
                [Currency.USD]: 1.0
            },
            [Currency.EUR]: {
                [Currency.EUR]: 1.0,
                [Currency.USD]: 0.91
            }
        }}
        isExchangeLoading={false}
        pocketList={[{
                currency: Currency.USD,
                balance: 100
            }, {
                currency: Currency.EUR,
                balance: 100
            },
        ]}
        onExchange={testExchange}
    />)


    expect(
        cmp
            .find(CurrencyInput)
            .at(0)
            .props()
            .balance
    ).toBe(100)
        cmp
            .find(CurrencyInput)
            .at(0)
            .props()
            .onChange('150')
    expect(
        cmp
        .find(CurrencyInput)
        .at(0)
        .props()
        .error
    ).toBe('insufficient funds')
    cmp
        .find(CurrencyInput)
        .at(0)
        .props()
        .onChange('50')
    expect(
        cmp
            .find(CurrencyInput)
            .at(1)
            .props()
            .value
    ).toBe("55.00")
    expect(
        cmp
            .find(CurrencyInput)
            .at(1)
            .props()
            .subtitle
    ).toBe("€1 = $0.91")
    cmp
        .find(CurrencyInput)
        .at(0)
        .props()
        .onLeft()
    expect(
        cmp
            .find(CurrencyInput)
            .at(0)
            .props()
            .error
    ).toBe('same currencies')
    expect(
        cmp
            .find(CurrencyInput)
            .at(1)
            .props()
            .value
    ).toBe("")
    expect(
        cmp
            .find('.exchange-screen__exchange')
            .hasClass('exchange-screen__exchange_disabled')
    ).toBeTruthy()
    cmp
        .find(CurrencyInput)
        .at(0)
        .props()
        .onLeft()
    cmp
        .find(CurrencyInput)
        .at(0)
        .props()
        .onChange("50.00")
    expect(
        cmp
            .find('.exchange-screen__exchange')
            .hasClass('exchange-screen__exchange_disabled')
    ).toBeFalsy()
    cmp
        .find('.exchange-screen__exchange')
        .simulate('click')
    expect(
        testExchange
    ).toBeCalledWith(
        50,
        Currency.USD,
        Currency.EUR
    )
})