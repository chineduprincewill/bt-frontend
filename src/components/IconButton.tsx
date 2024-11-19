import React from 'react';
import { twMerge } from 'tailwind-merge';
import CategoryIcon from "../assets/category-icon.svg"

interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon?: React.ReactNode;
    position?: 'left' | 'right';
    iconType?: "default"
}

export default function IconButton({ className, icon, children, position = 'left', iconType, ...props }: IButton) {

    if(iconType === 'default') {
        icon = <img src={CategoryIcon} alt="category" className="w-6 h-6" />
    }

    return (
        <button className={twMerge('flex gap-[10px] items-center border border-lightGray-5 border-solid', className)} {...props}>
            {position === 'left' && icon}
            {children}
            {position === 'right' && icon}
        </button>
    );
}
