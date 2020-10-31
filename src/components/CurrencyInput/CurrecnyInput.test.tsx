import { shallow, configure } from 'enzyme';
import React from 'react';
import { Currency } from '../../typings/currency';
import { CurrencyInput } from './CurrencyInput';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() })

test('CurrencyInput', () => {
    const cmp = shallow(<CurrencyInput
        currency={Currency.USD}
        balance={100}
        value="100"
        onChange={() => {}}
        pocketList={[Currency.USD, Currency.EUR]}
        onLeft={() => {}}
        onRight={() => {}}
    />)

    expect(cmp.find('.currency-input__currency').text()).toEqual('USD')
    expect(cmp.find('.currency-input__balance').text()).toEqual('You have $100.00')

    // check active dot at the bottom
    expect(cmp.find('.currency-input__pocket-indicator').at(0).hasClass('currency-input__pocket-indicator_active')).toBeTruthy()
    expect(cmp.find('.currency-input__pocket-indicator').at(1).hasClass('currency-input__pocket-indicator_active')).toBeFalsy()

})