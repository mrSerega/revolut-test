import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import './Layout.css';

export interface LayoutProps {
    children?: ReactElement
}

const className = 'layout'

export const Layout: React.FC<LayoutProps> = ({
    children
}: LayoutProps) => {
    return <div className={className}>
        <div className={className + '__content'}>
            {children}
        </div>
        <div className={className + '__menu'}>
            <div className={className + '__dashboard-button'}>
                <Link to='/dashboard' className={className + '__dashboard-link'}/>
            </div>
            <div className={className + '__wallet-button'}>
                <Link to='/wallet' className={className + '__wallet-link'}/>
            </div>
        </div>
    </div>
}