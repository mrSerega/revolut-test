import React from 'react';

import './Spinner.css'

export class Spinner extends React.Component {
    readonly blockName = 'spinner'

    render() {
        return <svg height="56" width="56" className={this.blockName}>
            <circle
                cx="28"
                cy="28"
                r="24"
                stroke="white"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray="0 10" strokeLinecap="round"
            />
        </svg>
    }
}