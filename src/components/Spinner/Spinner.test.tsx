import React from 'react';
import renderer from 'react-test-renderer';
import { Spinner } from './Spinner';

test('Spinner', () => {
    const cmp = renderer.create(
        <Spinner/>
    )
    const tree = cmp.toJSON()
    expect(tree).toMatchSnapshot()
})