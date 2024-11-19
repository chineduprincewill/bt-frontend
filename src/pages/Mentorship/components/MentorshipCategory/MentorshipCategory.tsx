import React from 'react';
import ProductDesignImage from '../../../../assets/mentorship-product-design.png';
import { MENTORSHIP_CATEGORIES } from '../../Mentorship.data';
import { Link } from 'react-router-dom';

interface IMentorshipCategory {
    label: string;
    subTItle: string;
    value: string
    onClick: () => void
}

export default function MentorshipCategory({ label, subTItle, value, onClick }: IMentorshipCategory) {
    return (
        <Link to={{search: `?categoryId=${value}`}} onClick={onClick}>
            <div className="flex flex-col gap-2">
                <div className="w-full h-[160px] object-contain rounded-[10px]">
                    <img src={ProductDesignImage} alt="mentorship category" className="h-full w-full object-cover" />
                </div>
                <h3 className="text-sm font-medium text-[#545045]">{label}</h3>
                <p className="text-[#8D9091] font-medium text-xs">{subTItle}</p>
            </div>
        </Link>
    );
}
