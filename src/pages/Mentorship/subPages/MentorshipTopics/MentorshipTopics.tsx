import React from 'react';

import { useGetLoggedInUserInfoQuery } from '../../../../api/userApi';
import ArrowBackBlack from '../../../../assets/arrow-left.svg';
import ThreeDots from '../../../../assets/three-dots.svg';
import DropdownSearch from '../../../../components/DropdownSearch';
import IconButton from '../../../../components/IconButton';
import IconInput from '../../../../components/IconInput';
import PageContainer from '../../../../components/PageContainer';
import { MentorshipData } from '../../../../types/mentorship';
import CreateSessionModal from '../../modals/CreateSessionModal';
import MentorshipTopic from './components/MentorshipTopic';
import useMentorshipTopics from './useMentorshipTopics';
import TopPageBar from '@components/TopPageBar';

export interface IMentorshipTopics {
    category: string;
    categoryId: string;
}

export default function MentorshipTopics() {
    const { mentorships, isLoading, options, categoryLoading, onSelectMoreOptions, onChangeSearchText, handleCategoryChange, resetFilters, goBack } =
        useMentorshipTopics();

    const { data: loggedInUserData } = useGetLoggedInUserInfoQuery(null);

    const loggedInUser = loggedInUserData?.data.user;

    if (isLoading || categoryLoading) {
        return <div>Loading Mentorships...</div>;
    }

    return (
        <PageContainer>
            <div className="h-full">
                {/* <div className="flex gap-5 items-end">
                    <img src={ProductDesignImage} alt="mentorship topic" className="h-[250px] aspect-square rounded-[20px]" />
                    <div className="flex flex-col gap-8">
                        <h2 className="text-[#545045] font-bold">Product Design</h2>
                        <p className="text-[#5aacc7] text-sm max-w-md">
                            Helping mentees define clear, achievable objectives and outlining steps to reach them.Helping mentees define clear,
                            achievable objectives and outlining steps to reach them.
                        </p>
                    </div>
                </div> */}
                <div className="mt-[5px]">
                    <div className="md:flex justify-between items-center  mb-6 w-full">
                        <div className="flex gap-3 items-center" onClick={goBack} role="button">
                            {/* <img src={ArrowBackBlack} alt="arrow back" className="w-6 h-6" /> */}
                            <h2 className="text-2xl font-semibold leading-6 text-textPrimary md:block">Mentorship</h2>
                        </div>
                        <div className="flex mt-5 md:mt-0 justify-between  md:gap-4 items-center ml-auto">
                            {/* <p className="text-xs md:text-sm  text-black font-medium whitespace-nowrap">
                                3 Session Left / <span className="text-[#959595]">5 Session</span>
                            </p> */}

                            <div className="flex items-center gap-7">
                                {loggedInUser && loggedInUser?.role.name === 'executive' && (
                                    <CreateSessionModal>
                                        <button className="btn-rounded bg-primary-red whitespace-nowrap">Create a Session</button>
                                    </CreateSessionModal>
                                )}
                                <DropdownSearch
                                    showSearch={false}
                                    options={MORE_OPTIONS}
                                    onChange={(e) => onSelectMoreOptions(e as string)}
                                    dropdownClassName="-left-[320px] top-10 w-[320px]"
                                >
                                    <img src={ThreeDots} className="w-6 h-6" alt="more options" />
                                </DropdownSearch>
                            </div>
                        </div>
                    </div>
                    <TopPageBar
                        onChangeSearch={onChangeSearchText}
                        dropdownOptions={options}
                        onChangeCategory={handleCategoryChange}
                        onRefreshFilter={resetFilters}
                    />
                </div>
                <div className="mt-[52px] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-14">
                    {mentorships?.map((mentorship: MentorshipData) => <MentorshipTopic key={mentorship.id} mentorship={mentorship} />)}
                </div>
            </div>
        </PageContainer>
    );
}

const MORE_OPTIONS = [
    {
        label: 'Pending Sessions',
        value: 'pending',
    },
    {
        label: 'Upcoming Sessions',
        value: 'upcoming',
    },
    {
        label: 'Completed Sessions',
        value: 'completed',
    },
];
