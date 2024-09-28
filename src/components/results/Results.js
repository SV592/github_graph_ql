import React from 'react';
import './Results.css';

function Results({ results, loading }) {
    // Display a loading spinner or message when data is being fetched
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    // If there are no results, display a friendly message
    if (results.length === 0) {
        return <div className="no-results">No results found. Try searching for something else.</div>;
    }

    return (
        <div className="results">
            {results.map((result, index) => (
                <div key={index} className="result-card">
                    <h3>{result.name}</h3>
                    <p>{result.description}</p>
                    <div className="result-stats">
                        <span>⭐ Stars: {result.stargazerCount}</span>
                        <span>🍴 Forks: {result.forkCount}</span>
                        <span>🐛 Issues: {result.issues.totalCount}</span>
                    </div>
                    <a href={result.url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </div>
            ))}
        </div>
    );
}

export default Results;
