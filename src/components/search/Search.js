import React, { useState } from 'react';
import './Search.css';

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="search">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search GitHub repositories or users..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
        </div>
    );
}

export default Search;
