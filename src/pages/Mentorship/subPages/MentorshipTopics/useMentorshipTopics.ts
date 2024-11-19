import { useNavigate, useSearchParams } from 'react-router-dom';

import { useGetAllMentorshipsQuery, useGetMentorshipsCategoryQuery } from '../../../../api/mentorship';

export default function useMentorshipTopics() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCategory = searchParams.get('category');
    const searchedMentorship = searchParams.get('q') || '';

    const profileId = searchParams.get('profileId') || '';

    const { data: mentorshipsData, isLoading: allMentorshipsLoading } = useGetAllMentorshipsQuery(
        { profileId, q: searchedMentorship },
        { refetchOnMountOrArgChange: true },
    );
    // Fetch mentorships based on category
    const { data: categoryMentorships, isLoading: categoryLoading } = useGetMentorshipsCategoryQuery(selectedCategory || '');

    const mentorships = selectedCategory ? categoryMentorships?.data : mentorshipsData?.data;
    const isLoading = allMentorshipsLoading || categoryLoading;

    const options = [
        { label: 'All', value: undefined },
        { label: 'Product Design', value: 'Product Design' },
        { label: 'Full Stack Development', value: 'Full Stack Development' },
        { label: 'Web Development', value: 'Web Development' },
        { label: 'Artificial Intelligence', value: 'Artificial Intelligence' },
        { label: 'Cybersecurity', value: 'Cybersecurity' },
    ];

    const handleCategoryChange = (value: string) => {
        setSearchParams(value ? { category: value } : {});
    };

    const resetFilters = () => {
        setSearchParams({});
    };

    function goBack() {
        navigate(-1);
    }

    function onSelectMoreOptions(e: string) {
        navigate(`/mentorship/booking?q=${e}`);
    }

    function onSearchMentorship(searchedString: string) {
        setSearchParams({ q: searchedString });
    }

    return {
        mentorships,
        isLoading,
        options,
        searchText: searchedMentorship || '',
        onChangeSearchText: onSearchMentorship,
        handleCategoryChange,
        resetFilters,
        goBack,
        categoryLoading,
        selectedCategory,
        onSelectMoreOptions,
    };
}
