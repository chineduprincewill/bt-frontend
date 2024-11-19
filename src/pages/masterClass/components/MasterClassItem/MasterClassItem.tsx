import React from 'react';
import { Link } from 'react-router-dom';

import { GoToProfile } from '@components/GoToProfile';

import ProfileIcon from '../../../../assets/profile-hd.png';
import { MasterClass } from '../../../../types/masterclass';
import { formatTheDate } from '../../../../utils/date';

interface MasterClassProp {
    masterclass: MasterClass;
}

export default function MasterClassItem({ masterclass }: MasterClassProp) {
    return (
        <div className="w-full aspect-video" role="button">
            <Link to={`/masterclass/${masterclass.id}`}>
                <div className="rounded-[10px] h-[170px] bg-accent-7 overflow-hidden">
                    {/* Video poster comes here */}
                    {/* {masterclass.url} */}
                    {/* <video src={masterclass.url} className="w-full h-full" poster={masterclass.url} controls>
                        Your browser does not support the video tag.
                    </video> */}
                    <img src={masterclass.thumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />
                </div>
                <div className="mt-2.5">
                    <div className="flex gap-2">
                        <img src={masterclass.instructor.user.displayImage ?? ProfileIcon} alt="profile icon" className="w-6 h-6 rounded-full" />
                        <div className="flex flex-col gap-2">
                            <h4 className="text-sm font-bold text-lightGray-4">{masterclass.title}</h4>
                            <GoToProfile userId={masterclass.instructor.id} username={masterclass.instructor.user.username}>
                                <p className="text-xs font-medium text-accent hover:underline">
                                    {masterclass.instructor.user.firstName} {masterclass.instructor.user.lastName}
                                </p>
                            </GoToProfile>
                            <p className="mt-0.5 text-xs text-accent-2">{formatTheDate(masterclass.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
