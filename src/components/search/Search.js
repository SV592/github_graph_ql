import React, { useState } from 'react';
import './Search.css';

function Search({ onSearch }) {
    const [repoSlugs, setRepoSlugs] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const slugs = repoSlugs.split(',').map(slug => slug.trim()); // Split slugs by commas and trim whitespace
        onSearch(slugs);  // Pass the array of slugs to the parent component (App.js)
    };

    return (
        <div className="search">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Enter repository slugs (e.g., facebook/react, nodejs/node)"
                    value={repoSlugs}
                    onChange={(e) => setRepoSlugs(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
        </div>
    );
}

export default Search;
