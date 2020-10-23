import React from 'react'

export interface TextInputProps {}

export class TextInput extends React.Component<TextInputProps> {
    readonly blockName = 'text-input'

    render() {
        return <div className={this.blockName}>
        </div>
    }
}