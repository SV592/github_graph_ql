import React, { useState } from 'react';
import './Token.css';

function GitHubToken({ onTokenSubmit }) {
    const [token, setToken] = useState('');

    const handleInputChange = (e) => {
        setToken(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (token.trim() !== '') {
            onTokenSubmit(token);  // Pass the token back to App.js or parent component
        }
    };

    return (
        <div className="github-token">
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter GitHub Token"
                    value={token}
                    onChange={handleInputChange}
                    className="token-input"
                />
                <button type="submit" className="token-button">Submit</button>
            </form>
        </div>
    );
}

export default GitHubToken;
