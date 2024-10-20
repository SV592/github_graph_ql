import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Search.css';

function Search({ onSearch }) {
    const [repoUrls, setRepoUrls] = useState('');

    // Parsing function to extract slugs from GitHub URLs
    const parseSlugs = (input) => {
        return input.split(',').map(slugOrUrl => {
            try {
                const url = new URL(slugOrUrl.trim());
                if (url.hostname === 'github.com') {
                    // Extract the owner/repo slug from GitHub URL
                    const pathParts = url.pathname.split('/').filter(Boolean);
                    if (pathParts.length >= 2) {
                        return `${pathParts[0]}/${pathParts[1]}`; // Returns the slug: owner/repo
                    }
                }
            } catch (error) {
                console.log(`Invalid URL: ${slugOrUrl}. Assuming it's a slug.`);
            }
            return slugOrUrl.trim(); // If it's not a URL, assume it's already a slug
        });
    };

    // Function to handle file reading and URL extraction
    const handleFileRead = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            const lines = content.split(/\r?\n/).map(line => line.trim()); // Split by newlines
            const validEntries = lines.filter(line => line !== ''); // Remove empty lines
            setRepoUrls(validEntries.join(', ')); // Set the content in state (comma-separated)
        };
        reader.readAsText(file);
    };

    // Dropzone for Repo URLs
    const { getRootProps, getInputProps } = useDropzone({
        accept: '.txt, .csv',
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0]; // Only accept the first file
            handleFileRead(file); // Read file and set repo URLs
        }
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const slugs = parseSlugs(repoUrls); // Parse URLs or slugs entered
        const validSlugs = slugs.filter(slug => slug.includes('/')); // Ensure it's a valid owner/repo format
        console.log(validSlugs);
        if (validSlugs.length === 0) {
            alert('Please enter valid GitHub repository URLs or slugs.');
        } else {
            onSearch(validSlugs); // Pass the valid slugs to the parent component
        }
    };

    return (
        <div className="search">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="url"
                    placeholder="Enter GitHub URLs or slugs"
                    value={repoUrls}
                    onChange={(e) => setRepoUrls(e.target.value)}
                    className="search-input"
                    required
                />
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop a file with URLs, or click to select one (.txt or .csv)</p>
                </div>
                <button type="submit" className="search-button">Search</button>
            </form>
        </div>
    );
}

export default Search;
