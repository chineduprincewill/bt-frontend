import React from 'react';
import { Circle } from './Circle';
import { DisplayIconForProfile } from '../pages/profile';
import { twMerge } from 'tailwind-merge';

interface IUserDetail {
    className?: string;
    name: string;
    img?: string;
}

export default function UserDetail({ name, className = '', img }: IUserDetail) {
    return (
        <div className={twMerge('flex gap-3 items-center', className)}>
            <Circle bg="" className="!h-8 !w-8 md:!h-[50px] md:!w-[50px] !rounded-full" noMg pd={0} img={DisplayIconForProfile(!img ? null : img)} />
            <div className="flex flex-col gap-1">
                <h5 className="text-accent font-bold text-xl">{name}</h5>
                {/* <h5 className="text-black font-medium">Head Growth Manager at Apex Inc.</h5> */}
            </div>
        </div>
    );
}
