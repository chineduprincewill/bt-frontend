import React, { useRef, useState } from 'react';
import SingleCommunity from '../SingleCommunity';
import IconInput from '@components/IconInput';
import ArrowLeft from '../../../assets/arrow-circle-left-1.svg';
import ArrowRight from '../../../assets/arrow-circle-right-1.svg';
import '../Villages/villagesstyle.scss';
import useCommunities from './useCommunities';
import Spinner from '@components/Spinner';

export default function TopCommunities() {
    const [searchValue, setSearchValue] = useState('');
    const { communities, isLoading, refetch, isSuccess } = useCommunities(searchValue);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const onChangeSearch = (value: string) => {
        setSearchValue(value);
    };

    const onEnterPress = () => {
        refetch();
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth',
            });
        }
    };

    console.log(searchValue);

    return (
        <div className="relative h-full">
            <div>
                <h2 className="text-xl font-semibold">Top Communities</h2>
            </div>
            <section className="flex pt-5 gap-5 w-full">
                <IconInput
                    containerClassName=" flex flex-1"
                    className="rounded-[32px] border border-lightGray-5 text-sm placeholder:text-accent-3 text-black font-medium"
                    iconType="search"
                    placeholder="Search for communities"
                    value={searchValue}
                    onChange={(e) => onChangeSearch(e.target.value)}
                    onEnterPress={onEnterPress}
                />

                <div className="hidden md:flex gap-3">
                    <img src={ArrowLeft} alt="Arrow left" className="cursor-pointer" onClick={scrollLeft} />
                    <img src={ArrowRight} alt="Arrow right" className="cursor-pointer" onClick={scrollRight} />
                </div>
            </section>

            {isLoading && (
                <div className="flex justify-center items-center my-10">
                    <Spinner height="40px" width="40px" />
                </div>
            )}

            {!isLoading && isSuccess && communities?.length === 0 && (
                <div className="flex justify-center items-center my-10">
                    <p>No communities found</p>
                </div>
            )}

            <div className="flex w-full mt-5 relative">
                <div ref={scrollContainerRef} className="absolute bottom=0 flex w-full overflow-x-auto hide-scrollbar">
                    <section className="flex gap-4">
                        {communities?.map((community) => <SingleCommunity key={community.id} community={community} />)}
                    </section>
                </div>
            </div>
        </div>
    );
}
