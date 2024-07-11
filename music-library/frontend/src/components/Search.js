import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (e) => {
        setQuery(e.target.value);
        const response = await axios.get(`/api/search/autocomplete?query=${e.target.value}`);
        setSuggestions(response.data);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search for artists"
            />
            <ul>
                {suggestions.map(suggestion => (
                    <li key={suggestion._id}>{suggestion.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
