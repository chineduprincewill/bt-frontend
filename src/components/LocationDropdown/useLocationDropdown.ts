import axios from 'axios';
import { useCallback, useState } from 'react';

import { ILocationSuggestion } from '@type/common';

import { ILocationDropdown } from './LocationDropdown';

const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: number;
    return function (...args: unknown[]) {
        clearTimeout(debounceTimer);
        // @ts-ignore
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
};

export default function useLocationDropdown({ onSelect }: ILocationDropdown) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<ILocationSuggestion[]>([]);

    const fetchSuggestions = useCallback(
        debounce(async (query: string) => {
            if (query.length > 2) {
                try {
                    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                        params: {
                            q: query,
                            format: 'json',
                            addressdetails: 1,
                            limit: 5,
                        },
                    });
                    setSuggestions(response.data);
                } catch (error) {
                    console.error('Error fetching location data:', error);
                }
            } else {
                setSuggestions([]);
            }
        }, 300),
        [],
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setQuery(query);
        fetchSuggestions(query);
    };

    const handleSuggestionClick = (suggestion: ILocationSuggestion) => {
        setQuery(suggestion.display_name);
        setSuggestions([]);
        onSelect(suggestion.display_name);
    };

    return {
        handleSuggestionClick,
        handleInputChange,
        query,
        suggestions,
    };
}
