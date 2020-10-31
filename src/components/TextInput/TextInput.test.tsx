import React from 'react';
import renderer from 'react-test-renderer';
import { TextInput } from './TextInput';

describe ('TextInput', () => {
    test('With empty value and placeholder', () => {
        const cmp = renderer.create(
            <TextInput
                value=""
                onChange={() => {}}
                placeholder="placeholder"
            />
        )
        const tree = cmp.toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('With not empty value and placeholder', () => {
        const cmp = renderer.create(
            <TextInput
                value="100"
                onChange={() => {}}
                placeholder="placeholder"
            />
        )
        const tree = cmp.toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('With not empty value and without placeholder', () => {
        const cmp = renderer.create(
            <TextInput
                value="100"
                onChange={() => {}}
            />
        )
        const tree = cmp.toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('With isFrom', () => {
        const cmp = renderer.create(
            <TextInput
                isFrom
                value="100"
                placeholder="placeholder"
                onChange={() => {}}
            />
        )
        const tree = cmp.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
