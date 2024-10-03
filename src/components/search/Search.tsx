import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { fetchMovieData } from '../../utilities/fetch';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      sessionStorage.removeItem('searchedMovie'); // Clear sessionStorage
      setLoading(true); // Start loading state

      try {
        const movies = await fetchMovieData(); // Fetch movies
        const fuse = new Fuse(movies, { keys: ['title'], threshold: 0.3 });
        const searchResults = fuse.search(query).map(result => result.item);
        sessionStorage.setItem('searchedMovie', JSON.stringify(searchResults));
        navigate('/video-archives/search-results');
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false); // End loading state
      }
    } else {
      alert('Please enter a movie name.'); // User feedback for empty input
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a movie..."
        aria-label="Search for a movie" // Accessibility improvement
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default Search;
