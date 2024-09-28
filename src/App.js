import React, { useState } from 'react';
import Header from './components/header/Header';
import Search from './components/search/Search';
import Results from './components/results/Results';
import Error from './components/error/Error';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setError(null);  // Reset error before a new search
    fetchDataFromGitHub(newQuery);
  };

  const fetchDataFromGitHub = async (searchQuery) => {
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

    const token = 'your-github-token';  // Replace with actual token

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
      setError(err.message);  // Set the error message to be displayed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <Search onSearch={handleSearch} />
      {error && <Error errorMessage={error} />}
      <Results results={results} loading={loading} />
    </div>
  );
}

export default App;
