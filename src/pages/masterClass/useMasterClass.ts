import { useState } from 'react';
import { useGetAllMasterclassesQuery, useGetMasterclassByCategoryQuery } from '../../api/masterclass';
import { useSearchParams } from 'react-router-dom';

export default function useMasterClass() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const searchedMasterclass = searchParams.get('q') || '';

    const selectedCategory = searchParams.get('category') || '';
    const encodedCategory = encodeURIComponent(selectedCategory);

    const {
        data: allMasterclassesResponse,
        isLoading: allMasterclassesLoading,
        isError,
        error,
    } = useGetAllMasterclassesQuery({ q: searchedMasterclass }, { refetchOnMountOrArgChange: true });

    const options = [
        { label: 'All', value: undefined },
        { label: 'Business & Leadership', value: 'Business & Leadership' },
        { label: 'Health & Fitness', value: 'Health & Fitness' },
        { label: 'Music & Performing Arts', value: 'music-performing-arts' },
        { label: 'Technology & Data', value: 'Technology & Data' },
        { label: 'Art & Design', value: 'Art & Design' },
        { label: 'Lifestyle & Wellness', value: 'Lifestyle & Wellness' },
    ];

    const { data: masterclassesByCategory, isLoading: categoryLoading } = useGetMasterclassByCategoryQuery(encodedCategory || '');

    const masterclasses = selectedCategory ? masterclassesByCategory?.data : allMasterclassesResponse?.data;
    const isLoading = allMasterclassesLoading || categoryLoading;

    function onSearchMasterclass(searchedString: string) {
        setSearchParams({ q: searchedString });
    }

    const handleCategoryChange = (value: string) => {
        setSearchParams(value ? { category: value } : {});
    };

    const resetFilters = () => {
        setSearchParams({});
    };

    return {
        masterclasses,
        onChangeSearchText: onSearchMasterclass,
        setSearchQuery,
        searchQuery,
        isLoading,
        isError,
        options,
        handleCategoryChange,
        resetFilters,
    };
}
