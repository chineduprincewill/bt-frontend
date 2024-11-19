import { useSearchParams } from 'react-router-dom';

export default function useMentorshipBooking() {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialTabQuery = searchParams.get('q');

    let initialTab = 0;

    if (initialTabQuery === 'pending') {
        initialTab = 0;
    } else if (initialTabQuery === 'upcoming') {
        initialTab = 1;
    } else if (initialTabQuery === 'completed') {
        initialTab = 2;
    }

    const setTabQuery = (tabIndex: number) => {
        let query = 'pending';
        if (tabIndex === 1) {
            query = 'upcoming';
        } else if (tabIndex === 2) {
            query = 'completed';
        }
        setSearchParams({ q: query });
    };

    return { initialTab, setTabQuery };
}
