import React from 'react';
import { twMerge } from 'tailwind-merge';

import SearchIcon from '../assets/search-icon.svg';

interface IIconInput extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    icon?: React.ReactNode;
    containerClassName?: string;
    iconClassName?: string;
    className?: string;
    iconType?: 'search';
    onEnterPress?: () => void;
}

// export default function IconInput({ icon, containerClassName, className, iconClassName, iconType, ...props }: IIconInput) {
//     if (iconType === 'search') icon = <img src={SearchIcon} alt="search" className={iconClassName} />;

//     return (
//         <div className={twMerge('relative', containerClassName)}>
//             {icon && <span className={twMerge('w-[18px] h-[18px] absolute left-[14px] top-[16px]', iconClassName)}>{icon}</span>}
//             <input className={twMerge(`p-[14px] disabled:cursor-not-allowed ${icon ? 'pl-[48px]' : ''} w-full`, className)} {...props} />
//         </div>
//     );
// }

export default function IconInput({ icon, containerClassName, className, iconClassName, iconType, onEnterPress, ...props }: IIconInput) {
    if (iconType === 'search') icon = <img src={SearchIcon} alt="search" className={iconClassName} />;

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && onEnterPress) {
            onEnterPress();
        }
    };

    return (
        <div className={twMerge('relative', containerClassName)}>
            {icon && <span className={twMerge('w-[18px] h-[18px] absolute left-[14px] top-[16px]', iconClassName)}>{icon}</span>}
            <input
                className={twMerge(`p-[14px] disabled:cursor-not-allowed ${icon ? 'pl-[48px]' : ''} w-full`, className)}
                onKeyDown={handleKeyPress}
                {...props}
            />
        </div>
    );
}
