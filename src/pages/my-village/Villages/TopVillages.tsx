import React, { useRef, useState } from 'react';
import PageContainer from '@components/PageContainer';
import IconInput from '@components/IconInput';
import SingleVillage from '../SingleVillage';
import ArrowRight from '../../../assets/arrow-circle-right-1.svg';
import ArrowLeft from '../../../assets/arrow-circle-left-1.svg';
import useVillages from './useVillages';
import Spinner from '@components/Spinner';

export default function TopVillages() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [searchValue, setSearchValue] = useState('');

    const { villages, isLoading, isSuccess } = useVillages(searchValue);

    const onChangeSearch = (value: string) => {
        setSearchValue(value);
    };

    console.log('VILLAGES', villages);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300, // Adjust this value to scroll more or less
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

    return (
        <div className="relative h-full">
            <h2 className="text-xl font-semibold">Top Villages</h2>
            <section className="flex pt-5 gap-5 w-full">
                <IconInput
                    containerClassName=" flex flex-1"
                    className="rounded-[32px] border border-lightGray-5 text-sm placeholder:text-accent-3 text-black font-medium"
                    iconType="search"
                    placeholder="Search for villages"
                    value={searchValue}
                    onChange={(e) => onChangeSearch(e.target.value)}
                />

                <div className="gap-3 hidden md:flex">
                    <img src={ArrowLeft} alt="Arrow left" className="cursor-pointer" onClick={scrollLeft} />
                    <img src={ArrowRight} alt="Arrow right" className="cursor-pointer" onClick={scrollRight} />
                </div>
            </section>

            {isLoading && (
                <div className="flex justify-center items-center my-10">
                    <Spinner height="40px" width="40px" />
                </div>
            )}

            {!isLoading && isSuccess && villages?.length === 0 && (
                <div className="flex justify-center items-center my-10">
                    <p>No villages found</p>
                </div>
            )}

            <div className="flex w-full mt-5 relative">
                <div ref={scrollContainerRef} className="flex absolute w-full overflow-x-scroll hide-scrollbar">
                    <section className="flex gap-4">{villages?.map((village) => <SingleVillage village={village} key={village.id} />)}</section>
                </div>
            </div>
        </div>
    );
}
