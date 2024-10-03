import { useEffect } from 'react';
import { MovieDisplay } from '../movieDisplay/MovieDisplay';
import Navbar from '../navbar/Navbar';

const SearchResults = () => {
  const searchedMovie =
    JSON.parse(sessionStorage.getItem('searchedMovie')) || [];

  console.log('Searched Movie:', searchedMovie);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('searchResults'); // Clear sessionStorage when leaving component
    };
  }, []);

  return (
    <div>
      <Navbar />
      {searchedMovie.length > 0 ? (
        <MovieDisplay movies={searchedMovie} title="Search Results" />
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
