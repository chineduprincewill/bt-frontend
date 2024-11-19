import React from 'react';

import AccordionItem, { IAccordionItem } from './AccordionItem';

export default function Accordion({ items }: { items: IAccordionItem[] }) {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    return (
        <div className="flex flex-col gap-4">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    body={item.body}
                    isOpen={activeIndex === index}
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                />
            ))}
        </div>
    );
}
