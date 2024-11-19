import React from 'react';
import useVillage from '../Village/useVillage';
import { formatTheDate } from '@utils/date';

export default function VillageRequests() {
    const { pendingMembers, handleAcceptVillageMember } = useVillage();

    return (
        <div className="w-full">
            {pendingMembers?.map((member) => (
                <div key={member.id} className="bg-[#F2F2F2] rounded-md flex items-center justify-between p-5 mb-3">
                    <div>
                        <p>
                            <span className="text-black font-bold">@{member.member.user.username}</span> wants to join your community
                        </p>
                        <p className="text-xs text-[#878787] pt-2">{formatTheDate(member.createdAt)}</p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => handleAcceptVillageMember(member.villageId, member.member.id)}
                            className="px-5 py-2 text-white bg-[#ff0000] rounded-3xl"
                        >
                            Accept
                        </button>
                        <button className="px-5 py-2 bg-black text-white rounded-3xl">Decline</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
