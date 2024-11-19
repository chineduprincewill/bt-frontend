import React, { useEffect, useRef, useState } from 'react';

import DropdownSearch from '../DropdownSearch';
import { IDropdownSearchOption, IDropdownSearchRef } from '../DropdownSearch/DropdownSearch';
import IconButton from '../IconButton';
import IconInput from '../IconInput';

interface ITopPageBar {
    searchValue?: string;
    onChangeSearch?: (e: string) => void;
    selectedCategory?: string;
    onChangeCategory?: (e: string) => void;
    dropdownOptions?: IDropdownSearchOption[];
    onRefreshFilter?: () => void;
}

export default function TopPageBar({
    searchValue,
    selectedCategory,
    dropdownOptions,
    onChangeSearch = () => {},
    onChangeCategory = () => {},
    onRefreshFilter = () => {},
}: ITopPageBar) {
    const [_searchValue, _setSearchValue] = useState('');
    const dropdownRef = useRef<IDropdownSearchRef | null>(null)

    useEffect(() => {
        _setSearchValue(searchValue || '');
    }, [searchValue]);

    function onRefresh() {
        onRefreshFilter();
        _setSearchValue('');
        onChangeCategory('');
        dropdownRef.current?.clear();
    }

    return (
        <div className="sticky top-0 flex flex-col w-full gap-6 mt-6 bg-white md:flex-row">
            <IconInput
                containerClassName=" flex flex-1"
                className="rounded-[32px] border border-lightGray-5 text-sm placeholder:text-accent-3 text-black font-medium"
                iconType="search"
                placeholder="Search for topics"
                value={_searchValue}
                onChange={(e) => _setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onChangeSearch(_searchValue)}
            />
            <div className="flex gap-6">
                <DropdownSearch
                    dropdownClassName="w-[250px] -left-[100px]"
                    className="w-max"
                    options={dropdownOptions || []}
                    value={selectedCategory}
                    ref={dropdownRef}
                    onChange={(e) => onChangeCategory(e as string)}
                >
                    {(selected) => (
                        <IconButton className="text-base text-dark px-6 py-3 rounded-[36px] font-medium " iconType="default">
                            {selected ? selected : 'Category'}
                        </IconButton>
                    )}
                </DropdownSearch>
                <button className="text-base font-medium whitespace-nowrap text-dark" onClick={onRefresh}>
                    Reset Filter
                </button>
            </div>
        </div>
    );
}
