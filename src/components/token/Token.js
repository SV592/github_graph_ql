import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';  // Import from react-dropzone
import './Token.css';

function GitHubToken({ onTokenSubmit }) {
    const [tokens, setTokens] = useState('');

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

    const handleTokenSubmit = (e) => {
        e.preventDefault();
        const tokenList = tokens.split(',').map(token => token.trim());
        if (tokenList.length === 0) {
            alert('Please enter valid GitHub tokens.');
        } else {
            onTokenSubmit(tokenList);  // Pass the tokens to the parent component
        }
    };

    return (
        <div className="token-section">
            <form onSubmit={handleTokenSubmit} className="token-form">
                <div className="input-wrapper">
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
                    <button type="submit" className="token-button">Submit Tokens</button>
                </div>
            </form>
        </div>
    );
}

export default GitHubToken;
