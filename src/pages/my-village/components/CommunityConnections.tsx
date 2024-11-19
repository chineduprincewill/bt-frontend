import { Circle } from '@components/Circle';
import React, { useState } from 'react';
import DefaultImage from '../../../assets/village-default-image.jpeg';
import LinkIcon from '../../../assets/link-circle-red.svg';
import SendInvite from './SendInvite';
import useCommunity from '../Community/useCommunity';

export default function CommunityConnections() {
    const [showSendInvite, setShowSendInvite] = useState(false);
    const { members } = useCommunity();
    return (
        <div className="border border-solid border-[#E9E9E9] w-full max-w-[366px] rounded-xl p-5 space-y-3">
            <h3>{members?.length} Members</h3>

            <div>
                <div onClick={() => setShowSendInvite(!showSendInvite)} className="bg-[#F2F2F2] rounded-md w-full p-2">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <img src={LinkIcon} alt="icon" />

                        <p>Invite to Community</p>
                    </div>
                </div>

                <div className="space-y-5 mt-5">
                    <div className="space-y-2">
                        <h4 className="text-xs">Mutuals</h4>
                        <div className="space-y-3">
                            {members?.map((member, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Circle
                                        img={member.member.user.displayImage || DefaultImage}
                                        pd={0}
                                        height={40}
                                        width={40}
                                        noMg
                                        bg="transparent"
                                        borderColor="transparent"
                                        noBorder
                                    />
                                    <p>
                                        {member.member.user.firstName} {member.member.user.lastName}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-xs">Members</h4>
                        <div className="space-y-3">
                            {members?.map((member, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Circle
                                        img={member.member.user.displayImage || DefaultImage}
                                        pd={0}
                                        height={40}
                                        width={40}
                                        noMg
                                        bg="transparent"
                                        borderColor="transparent"
                                        noBorder
                                    />
                                    <p>
                                        {member.member.user.firstName} {member.member.user.lastName}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-blue-400 font-medium text-xs">See all members</p>
                </div>
            </div>

            {showSendInvite && <SendInvite onClose={() => setShowSendInvite(false)} />}
        </div>
    );
}
