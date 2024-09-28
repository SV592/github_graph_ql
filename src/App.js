import React, { useState } from 'react';

// Components
import Header from './components/header/Header';
import Search from './components/search/Search';
import Results from './components/results/Results';
import Error from './components/error/Error';
import GitHubToken from './components/token/Token';

// Styles
import './App.css';


// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [token, setToken] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setError(null);
    fetchDataFromGitHub(newQuery);
  };

  const handleTokenSubmit = (newToken) => {
    setToken(newToken);
    setError(null);  // Reset error when new token is submitted
  };

  const fetchDataFromGitHub = async (searchQuery) => {
    if (!token) {
      setError('Please provide a valid GitHub token.');
      return;
    }

    setLoading(true);

    const query = `
      query($queryString: String!) {
        search(query: $queryString, type: REPOSITORY, first: 10) {
          edges {
            node {
              ... on Repository {
                name
                description
                stargazerCount
                forkCount
                issues {
                  totalCount
                }
                url
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Use the token provided by the user
        },
        body: JSON.stringify({
          query: query,
          variables: { queryString: searchQuery }
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      const repositories = json.data.search.edges.map(edge => edge.node);
      setResults(repositories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <GitHubToken onTokenSubmit={handleTokenSubmit} />
      <Search onSearch={handleSearch} />
      {error && <Error errorMessage={error} />}
      <Results results={results} loading={loading} />
    </div>
  );
}

export default App;
