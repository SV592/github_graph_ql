import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Message from '../message/Message'; // Import the updated Message component
import './Token.css';

function GitHubToken({ onTokenSubmit }) {
    const [tokens, setTokens] = useState('');
    const [error, setError] = useState(''); // Store error messages
    const [successMessage, setSuccessMessage] = useState(''); // Store success messages

    // Function to handle file reading and token extraction
    const handleFileRead = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            const lines = content.split(/\r?\n/).map(line => line.trim()); // Split by newlines
            const validEntries = lines.filter(line => line !== ''); // Remove empty lines
            setTokens(validEntries.join(', ')); // Set tokens
            setError(''); // Clear previous errors
            setSuccessMessage(''); // Clear success messages
        };
        reader.readAsText(file);
    };

    // Dropzone for Tokens
    const { getRootProps, getInputProps } = useDropzone({
        accept: '.txt, .csv',
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            handleFileRead(file); // Read the file and update tokens
        }
    });

    // Function to validate the token with GitHub API
    const validateToken = async (token) => {
        try {
            const response = await fetch('https://api.github.com/rate_limit', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Invalid token: ${token}`);
            }

            return true; // Token is valid
        } catch {
            return false; // Token is invalid
        }
    };

    const handleTokenSubmit = async (e) => {
        e.preventDefault();
        const tokenList = tokens.split(',').map(token => token.trim());
        const invalidTokens = [];
        const validTokens = [];

        for (const token of tokenList) {
            const isValid = await validateToken(token);
            if (isValid) {
                validTokens.push(token);
            } else {
                invalidTokens.push(token);
            }
        }

        if (invalidTokens.length > 0) {
            setError(`Invalid tokens: ${invalidTokens.join(', ')}`); // Display invalid tokens
        } else {
            setError(''); // Clear error if no invalid tokens
        }

        if (validTokens.length > 0) {
            setSuccessMessage(`Valid tokens: ${validTokens.join(', ')}`); // Display valid tokens
            onTokenSubmit(validTokens); // Pass valid tokens to parent component
        } else {
            setSuccessMessage(''); // Clear success message if no valid tokens
        }

        setTokens(''); // Clear input field after processing
    };

    return (
        <div className="token-section">
            <form onSubmit={handleTokenSubmit} className="token-form input-wrapper">
                <input
                    type="text"
                    placeholder="Enter GitHub Token(s)"
                    value={tokens}
                    onChange={(e) => setTokens(e.target.value)}
                    className="token-input"
                    required
                />
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop a file with tokens, or click to select one (.txt or .csv)</p>
                </div>
                {error && <Message message={error} type="error" />} {/* Use Message for error */}
                {successMessage && <Message message={successMessage} type="success" />} {/* Use Message for success */}
                <button type="submit" className="token-button">Submit Tokens</button>
            </form>
        </div>
    );
}

export default GitHubToken;
