import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useViewSingleMentorshipQuery } from '../../../../../../api/mentorship';

export default function useMentorshipTopic() {
    const [searchText, setSearchText] = useState('');

    const { id } = useParams();
    const { data: singleMentorshipData } = useViewSingleMentorshipQuery(id!);
    console.log(singleMentorshipData);

    return {
        singleMentorshipData,
        searchText,
        onChangeSearchText: setSearchText,
    };
}
