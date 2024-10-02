import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { fetchMovieData } from '../../utilities/fetch';

const Search = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const movies = await fetchMovieData(); 

      // Fuse.js configuration and search
      const fuse = new Fuse(movies, { keys: ['title'], threshold: 0.3 });
      const searchResults = fuse.search(query);
      console.log(searchResults.map(result => result.item));
    } else {
      console.log('Please enter a movie name.'); 
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a movie..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
