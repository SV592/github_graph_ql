import React, { useState } from 'react';
import Header from './components/header/Header';
import Search from './components/search/Search';
import Results from './components/results/Results';
import Error from './components/error/Error';
import GitHubToken from './components/token/Token';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (repoSlugs) => {
    setError(null);
    fetchDataFromGitHub(repoSlugs);
  };

  const handleTokenSubmit = (newToken) => {
    setToken(newToken);  // Store the token if provided
    setError(null);
  };

  const fetchDataFromGitHub = async (repoSlugs) => {
    setLoading(true);

    const queries = repoSlugs.map(slug => {
      const [owner, name] = slug.split('/');
      return `
        ${name.replace(/-/g, '_')}: repository(owner: "${owner}", name: "${name}") {
          name
          description
          forkCount
          stargazerCount
          createdAt
          archivedAt
          isArchived
          isFork
          isPrivate
          visibility
          url
        }
      `;
    }).join('\n');

    const query = `
      query {
        ${queries}
      }
    `;

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),  // Include token if provided
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      const repositories = Object.keys(json.data).map(key => json.data[key]);
      setResults(repositories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="app-grid">
        <div className="sidebar">
          <GitHubToken onTokenSubmit={handleTokenSubmit} />
          <Search onSearch={handleSearch} />
          {token === '' && (
            <div className="rate-limit-warning">
              <p>
                <strong>Note:</strong> If you're using the app without a GitHub token.
                Unauthenticated requests are limited to <strong>60</strong> per hour. For higher limits and access to more data, please provide a token.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
