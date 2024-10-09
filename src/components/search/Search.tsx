import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { fetchMovieData } from '../../utilities/fetch';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import searchGlass from '../../assets/search-glass-white.svg';

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
      setLoading(true);

      try {
        const movies = await fetchMovieData();
        const fuse = new Fuse(movies, { keys: ['title'], threshold: 0.3 });
        const searchResults = fuse.search(query).map(result => result.item);

        sessionStorage.setItem('searchedMovie', JSON.stringify(searchResults));

        // Navigate to the search results page with query parameter to force update
        navigate(
          `/video-archives/search-results?query=${encodeURIComponent(query)}`
        );
        setQuery('');
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a movie name.');
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-container">
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a movie..."
        aria-label="Search for a movie"
      />
      <button className="search-button" type="submit" disabled={loading}>
        <img src={searchGlass} alt="Search" className="search-icon" />
      </button>
    </form>
  );
};

export default Search;
