import useLocationDropdown from './useLocationDropdown';

export interface ILocationDropdown {
    onSelect: (suggestion: string) => void;
    value: string;
}

export default function LocationDropdown(props: ILocationDropdown) {
    const { suggestions, query, handleInputChange, handleSuggestionClick } = useLocationDropdown(props);

    return (
        <div className="">
            {/* <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter a location"
                className="w-full p-2 border border-gray-300 rounded-lg"
            /> */}
            <input type="text" placeholder="Enter your job location here" value={query} onChange={handleInputChange} />
            {suggestions.length > 0 && (
                <ul className="mt-2 bg-white border border-gray-300 rounded-lg">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.place_id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                            {suggestion.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
