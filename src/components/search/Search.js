import React, { useState } from 'react';
import './Search.css';

function Search({ onSearch }) {
    const [repoSlugs, setRepoSlugs] = useState('');

    const parseSlugs = (input) => {
        return input.split(',').map(slugOrUrl => {
            try {
                const url = new URL(slugOrUrl);
                if (url.hostname === 'github.com') {
                    return url.pathname.slice(1);
                }
            } catch (error) {
                console.log(`Invalid URL: ${slugOrUrl}. Assuming it's a slug.`);
            }
            return slugOrUrl;
        });
    }

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
                    placeholder="Repo Link (e.g., facebook/react)"
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
