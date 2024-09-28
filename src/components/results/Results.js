import React from 'react';
import './Results.css';

function Results({ results, loading }) {
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (results.length === 0) {
        return <div className="no-results">No repositories found. Try different slugs.</div>;
    }

    return (
        <div className="results">
            {results.map((repo, index) => (
                <div key={index} className="result-card">
                    <h3>{repo.name}</h3>
                    <p>{repo.description}</p>
                    <div className="result-stats">
                        <span>⭐ Stars: {repo.stargazerCount}</span>
                        <span>🍴 Forks: {repo.forkCount}</span>
                        <span>📅 Created: {new Date(repo.createdAt).toLocaleDateString()}</span>
                    </div>
                    {repo.isArchived && <p className="archived">This repository is archived</p>}
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </div>
            ))}
        </div>
    );
}

export default Results;
