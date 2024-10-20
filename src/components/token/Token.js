import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Token.css';

function GitHubToken({ onTokenSubmit }) {
    const [tokens, setTokens] = useState('');
    const [error, setError] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(false);  // New state to track token validity

    // Function to handle file reading and token extraction
    const handleFileRead = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            const lines = content.split(/\r?\n/).map(line => line.trim());  // Split by newlines
            const validEntries = lines.filter(line => line !== '');  // Remove empty lines
            setTokens(validEntries.join(', '));  // Set the content in state (comma-separated)
        };
        reader.readAsText(file);
    };

    // Dropzone for Tokens
    const { getRootProps, getInputProps } = useDropzone({
        accept: '.txt, .csv',
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];  // Only accept the first file
            handleFileRead(file);  // Read file and set tokens
        }
    });

    // Function to validate the token with the GitHub API
    const validateToken = async (token) => {
        try {
            const response = await fetch('https://api.github.com/rate_limit', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Invalid GitHub Token!');
            }

            const data = await response.json();
            setError('');  // Clear any previous errors
            setIsTokenValid(true);  // Set token validity to true
            onTokenSubmit(token);  // Pass the valid token to the parent component

        } catch (err) {
            setError(err.message);  // Display error if token is invalid
            setIsTokenValid(false);  // Set token validity to false
        }
    };

    const handleTokenSubmit = (e) => {
        e.preventDefault();
        const tokenList = tokens.split(',').map(token => token.trim());

        if (tokenList.length === 0) {
            setError('Please enter at least one GitHub token.');
        } else {
            // Validate the first token (you could extend this to handle multiple tokens)
            validateToken(tokenList[0]);
        }
    };

    return (
        <div className="token-section">
            <form onSubmit={handleTokenSubmit} className="token-form input-wrapper">
                <input
                    type="text"
                    placeholder="Enter GitHub Token"
                    value={tokens}
                    onChange={(e) => setTokens(e.target.value)}
                    className="token-input"
                    required
                />
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop a file with tokens, or click to select one (.txt or .csv)</p>
                </div>
                {error && <p className="error-message">{error}</p>}  {/* Display validation error in red */}
                {isTokenValid && <p className="success-message">Valid Github Token!</p>}  {/* Display success message in green */}
                <button type="submit" className="token-button">Submit Tokens</button>
            </form>
        </div>
    );
}

export default GitHubToken;
