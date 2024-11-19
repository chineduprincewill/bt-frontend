import React from 'react';
import StarFilled from '../assets/star-filled.svg';
import StarUnfilled from '../assets/star-unfilled.svg';
import { twMerge } from 'tailwind-merge';

interface IRating {
    value: number;
    className?: string;
    starClassName?: string;
}

export default function Rating({ value, className, starClassName }: IRating) {
    return (
        <div className={twMerge('flex gap-1', className)}>
            {[...Array(5)].map((_, i) => (
                <img key={i} src={i < value ? StarFilled : StarUnfilled} alt="star" className={twMerge('w-[18px] h-[18px]', starClassName)} />
            ))}
        </div>
    );
}
