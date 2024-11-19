import React from 'react';

import TopPageBar from '@components/TopPageBar';

import CategoryIcon from '../../assets/category-icon.svg';
import ThreeDots from '../../assets/three-dots.svg';
import DropdownSearch from '../../components/DropdownSearch';
import IconButton from '../../components/IconButton';
import IconInput from '../../components/IconInput';
import PageContainer from '../../components/PageContainer';
import MentorshipCategory from './components/MentorshipCategory';
import MentorshipTopics from './subPages/MentorshipTopics';
import useMentorship from './useMentorship';

export default function Mentorship() {
    const {
        mentorships: mentorshipData,
        filteredMentorshipCategories,
        onChangeSearchText,
        clearSearchFilter,
        searchText,
        onSelectMoreOptions,
        onSearchMentorship,
    } = useMentorship();

    return (
        <PageContainer
            title="Mentorship"
            rightContent={
                <div className="flex gap-4 items-center flex-1">
                    <p className="text-sm text-black font-medium whitespace-nowrap">
                        3 Session Left / <span className="text-[#959595]">5 Session</span>
                    </p>
                    <button className="btn-rounded bg-primary-red whitespace-nowrap">Create a Session</button>
                    <DropdownSearch
                        showSearch={false}
                        options={MORE_OPTIONS}
                        onChange={(e) => onSelectMoreOptions(e as string)}
                        dropdownClassName="-left-[320px] top-10 w-[320px]"
                    >
                        <img src={ThreeDots} className="w-6 h-6" alt="more options" />
                    </DropdownSearch>
                </div>
            }
        >
            <div className="mt-10">
                {/* <TopPageBar onChangeSearch={onSearchMentorship} onChangeCategory={} /> */}
                {/* <div className="flex w-full flex-col gap-6 md:flex-row">
                    <IconInput
                        containerClassName=" flex flex-1"
                        className="rounded-[32px] border border-lightGray-5 text-sm placeholder:text-accent-3 text-black font-medium"
                        type="search"
                        placeholder="Search for topics"
                        value={searchText}
                        onChange={(e) => onChangeSearchText(e.target.value)}
                    />
                    <div className="flex gap-6">
                        <DropdownSearch options={[]} onChange={(val) => {}}>
                            <IconButton
                                className="text-base text-dark px-6 py-3 rounded-[36px] font-medium "
                                icon={<img src={CategoryIcon} alt="category" className="w-6 h-6" />}
                            >
                                Category
                            </IconButton>
                        </DropdownSearch>
                        <button className="text-base font-medium text-dark whitespace-nowrap">Reset Filter</button>
                    </div>
                </div> */}
                <div className="mt-[52px] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {filteredMentorshipCategories?.map((category) => (
                        <MentorshipCategory
                            key={category.label}
                            label={category.label}
                            subTItle={category.subTitle}
                            value={category.value}
                            onClick={clearSearchFilter}
                        />
                    ))}
                </div>
            </div>
        </PageContainer>
    );
}

const MORE_OPTIONS = [
    { label: 'Pending Requests', value: 'pending' },
    { label: 'Upcoming Sessions', value: 'upcoming' },
    {
        label: 'Completed Sessions',
        value: 'completed',
    },
];
