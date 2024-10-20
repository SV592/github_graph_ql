import React, { useState } from 'react';
import './Search.css';

function Search({ onSearch }) {
    const [repoSlugs, setRepoSlugs] = useState('');

    const parseSlugs = (input) => {
        return input.split(',').map(slugOrUrl => {
            slugOrUrl = slugOrUrl.trim(); // Trim whitespace
            try {
                const url = new URL(slugOrUrl);
                if (url.hostname === 'github.com') {
                    const pathParts = url.pathname.split('/').filter(Boolean); // Split path by "/" and remove empty parts
                    if (pathParts.length >= 2) {
                        return `${pathParts[0]}/${pathParts[1]}`; // Return "owner/repo"
                    }
                } else {
                    throw new Error(`${slugOrUrl} is not a GitHub link.`);
                }
            } catch (error) {
                console.log(`Error: ${error.message}. Assuming it's a slug.`);
            }
            return slugOrUrl; // If it's not a valid URL, assume it's already a slug
        });
    };



    const handleSearch = (e) => {
        e.preventDefault();
        const slugs = parseSlugs(repoSlugs);  // Use the actual input value (repoSlugs)
        console.log(slugs);
        onSearch(slugs);  // Pass the array of slugs to the parent component (App.js)
    };


    return (
        <div className="search">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="url"
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
