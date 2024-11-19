import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useGetAllMentorshipsQuery } from '../../api/mentorship';
import { MENTORSHIP_CATEGORIES } from './Mentorship.data';

export default function useMentorship() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const searchedCategory = searchParams.get('category');

    const { data: mentorshipData } = useGetAllMentorshipsQuery({});
    const mentorships = mentorshipData?.data || [];

    function clearSearchFilter() {
        setSearchText('');
    }

    function onSearchMentorship(query: string) {
        setSearchParams((prev) => ({ ...prev, query }));
    }

    function onSelectMoreOptions(e: string) {
        navigate(`/mentorship/booking?q=${e}`);
    }

    const filteredMentorshipCategories = MENTORSHIP_CATEGORIES.filter((category) => category.label.toLowerCase().includes(searchText.toLowerCase()));

    return {
        mentorships,
        searchText,
        filteredMentorshipCategories,
        onChangeSearchText: setSearchText,
        clearSearchFilter,
        onSelectMoreOptions,
        onSearchMentorship,
    };
}
