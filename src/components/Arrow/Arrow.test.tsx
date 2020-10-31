import React from 'react';
import renderer from 'react-test-renderer';
import { Arrow } from './Arrow';

test('Arrow', () => {
    const cmp = renderer.create(
        <Arrow/>
    )
    const tree = cmp.toJSON();
    expect(tree).toMatchSnapshot()
})