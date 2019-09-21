import React from 'react';

interface HeaderProps {
    className: string
}

export const Header: React.FC<HeaderProps> = ({ className }) => (
    <header className={className}>
        <img alt="favicon" />
    </header>
)

