import React from 'react';
import renderer from 'react-test-renderer';
import { ModalWindow } from './ModalWindow';

test('ModalWindow', () => {
    const cmp = renderer.create(
        <ModalWindow
            onClose={() => {}}
            message="message"
        />
    )
    const tree = cmp.toJSON()
    expect(tree).toMatchSnapshot()
})