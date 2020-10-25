import React from 'react';

import './Spinner.css'

export interface SpinnerProps {

}

export class Spinner extends React.Component<SpinnerProps> {
    readonly blockName = 'spinner'

    render() {
        return <svg height="56" width="56" className={this.blockName}>
            <circle
                cx="28"
                cy="28"
                r="24"
                stroke="white"
                stroke-width="4"
                fill="transparent"
                stroke-dasharray="0 10" stroke-linecap="round"
            />
        </svg>
    }
}