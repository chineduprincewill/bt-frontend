import { Circle } from '@components/Circle';
import React from 'react';
import DefaultImage from '../../../assets/default-user-image.jpeg';
import RandomFellow from '../../../assets/random-fellow.jpeg';

import useVillage from '../Village/useVillage';

export default function Members() {
    const { activeMembers } = useVillage();

    if (activeMembers?.length === 0) return <div>No active members at the moment</div>;

    return (
        <div className="py-12">
            <div className="grid grid-cols-4 gap-y-5 gap-x-7">
                {activeMembers?.map((member, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Circle
                            img={member.member.user.displayImage || DefaultImage}
                            pd={0}
                            height={90}
                            width={90}
                            className="md:height-[200px] md:width-[200px]"
                            noMg
                            bg="transparent"
                            borderColor="transparent"
                            noBorder
                        />
                        <p className="text-center text-sm md:text-xl pt-3 font-semibold">
                            {member.member.user.firstName} {member.member.user.lastName}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
