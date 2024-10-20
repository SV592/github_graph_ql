import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Search.css';

function Search({ onSearch }) {
    const [repoUrls, setRepoUrls] = useState('');

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
        const urls = repoUrls.split(',').map(url => url.trim());
        const validUrls = urls.filter(url => {
            try {
                const parsedUrl = new URL(url);
                return parsedUrl.hostname === 'github.com'; // Only allow GitHub URLs
            } catch (error) {
                return false; // Invalid URL
            }
        });

        if (validUrls.length === 0) {
            alert('Please enter valid GitHub repository URLs.');
        } else {
            onSearch(validUrls); // Pass the valid URLs to the parent component
        }
    };

    return (
        <div className="search">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="url"
                    placeholder="Enter GitHub URL"
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
