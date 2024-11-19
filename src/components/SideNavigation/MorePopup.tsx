import React from 'react';
import ClickOutsideWrapper from '@components/ClickOutWrapper';
import { TabIcon } from '@pages/feeds';
import { Link } from 'react-router-dom';
import Mentorship from '../../assets/teacher2.svg';
import Briefcase from '../../assets/briefcase2.svg';
import Education from '../../assets/video-square.svg';
import People from '../../assets/people.svg';

interface Props {
    close: () => void;
}

export default function MorePopup({ close }: Props) {
    return (
        <div
            className="
        fixed top-[40%] left-[14rem] z-50 mt-16 mr-4"
        >
            <ClickOutsideWrapper onClickOutside={close} className="bg-white z-50 rounded-lg shadow-lg w-full max-w-[256px]">
                <div className="text-[#959595]  p-3 w-full">
                    <Link to="/mentorship">
                        <div onClick={close} className="flex items-center w-full hover:bg-[#EDEDED] rounded-md p-2">
                            <TabIcon src={Mentorship} />
                            <div>
                                <h3 className="text-sm">Mentorship</h3>
                                <p className="text-xs">Take mentorship, book sessions</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/jobs">
                        <div onClick={close} className="flex items-center w-full hover:bg-[#EDEDED] rounded-md p-2">
                            <TabIcon src={Briefcase} />
                            <div>
                                <h3 className="text-sm">Jobs</h3>
                                <p className="text-xs">Manage your job activities</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/masterclass">
                        <div onClick={close} className="flex items-center w-full hover:bg-[#EDEDED] rounded-md p-2">
                            <TabIcon src={Education} />
                            <div>
                                <h3 className="text-sm">Masterclass</h3>
                                <p className="text-xs">Select a Masterclass</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/village">
                        <div onClick={close} className="flex items-center w-full hover:bg-[#EDEDED] rounded-md p-2">
                            <TabIcon src={People} />
                            <div>
                                <h3 className="text-sm">My Village</h3>
                                <p className="text-xs">Join community of likeminds, connect and create magic</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </ClickOutsideWrapper>
        </div>
    );
}
