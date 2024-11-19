import React, { useState, useEffect } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

interface ITabOption {
    title: string;
    content: React.ReactNode;
}

interface ITabs {
    options: ITabOption[];
    className?: string;
    buttonContainerClassName?: string;
    initialTab?: number;
    onTabChange?: (index: number) => void;
}

export default function Tabs({ options, className = '', buttonContainerClassName = '', initialTab = 0, onTabChange }: ITabs) {
    const [currentTab, setCurrentTab] = useState(initialTab);

    const handleTabClick = (index: number) => {
        setCurrentTab(index);
        if (onTabChange) {
            onTabChange(index);
        }
    };

    return (
        <div className={className}>
            <div className={twJoin('tabs pt-[25px] sticky top-0 bg-white', buttonContainerClassName)}>
                {options.map((option, index) => (
                    <button className={`tab ${currentTab === index && 'active'}`} onClick={() => handleTabClick(index)}>
                        {option.title}
                    </button>
                ))}
            </div>
            {options[currentTab].content}
        </div>
    );
}
