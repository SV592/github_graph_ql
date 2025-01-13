import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Message from '../message/Message'; // Import the updated Message component
import './Search.css';

function Search({ onSearch }) {
    const [repoUrls, setRepoUrls] = useState('');
    const [error, setError] = useState(''); // State to handle validation errors
    const [successMessage, setSuccessMessage] = useState(''); // State for success messages
    const [validSlugs, setValidSlugs] = useState([]); // Store only valid entries

    // Parsing function to extract slugs from GitHub URLs
    const parseSlugs = (input) => {
        return input.split(',').map(slugOrUrl => {
            try {
                const url = new URL(slugOrUrl.trim());
                if (url.hostname === 'github.com') {
                    const pathParts = url.pathname.split('/').filter(Boolean);
                    if (pathParts.length >= 2) {
                        return `${pathParts[0]}/${pathParts[1]}`; // Returns the slug: owner/repo
                    }
                }
            } catch (error) {
                console.log(`Invalid URL: ${slugOrUrl}. Assuming it's a slug.`);
            }
            return slugOrUrl.trim(); // Assume it's already a slug
        });
    };

    // Function to handle file reading and URL extraction
    const handleFileRead = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            const lines = content.split(/\r?\n/).map(line => line.trim());
            const validEntries = lines.filter(line => line !== ''); // Remove empty lines
            setRepoUrls(validEntries.join(', '));
            setError(''); // Clear previous errors
            setSuccessMessage(''); // Clear success message
        };
        reader.readAsText(file);
    };

    // Dropzone for Repo URLs
    const { getRootProps, getInputProps } = useDropzone({
        accept: '.txt, .csv',
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            handleFileRead(file);
        }
    });

    const handleSearch = (e) => {
        e.preventDefault();

        const slugs = parseSlugs(repoUrls);
        const valid = slugs.filter(slug => slug.includes('/'));
        const invalid = slugs.filter(slug => !slug.includes('/'));

        if (invalid.length > 0) {
            setError(`Invalid entries found: ${invalid.join(', ')}`);
            setSuccessMessage('');
        } else {
            setError('');
            setSuccessMessage(`Valid repositories: ${valid.join(', ')}`);
        }

        setValidSlugs(valid);
        if (valid.length > 0) {
            onSearch(valid);
        }
    };

    return (
        <div className="search">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
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
                {error && <Message message={error} type="error" />}
                {successMessage && <Message message={successMessage} type="success" />}
                <button type="submit" className="search-button">Search</button>
            </form>
        </div>
    );
}

export default Search;
