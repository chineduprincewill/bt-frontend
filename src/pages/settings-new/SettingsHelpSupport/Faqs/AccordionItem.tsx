import React from 'react';

import AddIcon from '../../../../assets/add.svg';
import MinusIcon from '../../../../assets/minus.svg';

export interface IAccordionItem {
    title: string;
    body: React.ReactNode;
}

interface IAccordionItemProps extends IAccordionItem {
    isOpen: boolean;
    onClick: () => void;
}

export default function AccordionItem({ title, body, isOpen, onClick }: IAccordionItemProps) {
    return (
        <div className="w-full cursor-pointer" onClick={onClick}>
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{title}</h3>
                <img src={isOpen ? MinusIcon : AddIcon} className="w-6 h-6" />
            </div>
            {isOpen && <p className="w-full text-xs text-[#787878] font-medium mt-4 max-w-[80%]">{body}</p>}
        </div>
    );
}
