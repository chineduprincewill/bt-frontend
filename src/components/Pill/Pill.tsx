import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IPill {
    className?: string;
    children: React.ReactNode;
    color: string;
    active?: boolean;
    onClick?: () => void;
}

export default function Pill({ className = '', children, color, active, onClick }: IPill) {
    return (
        <span
            onClick={onClick && onClick}
            style={{ backgroundColor: color, borderColor: active ? 'black' : 'transparent' }}
            className={twMerge(
                'px-4 py-2 font-medium whitespace-nowrap text-xs md:text-sm rounded-full border-transparent border-solid border-2',
                className,
                onClick ? 'cursor-pointer' : '',
            )}
        >
            {children}
        </span>
    );
}
