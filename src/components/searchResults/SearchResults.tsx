import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MovieDisplay } from '../movieDisplay/MovieDisplay';
import Navbar from '../navbar/Navbar';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const location = useLocation();

  useEffect(() => {
    const storedResults = sessionStorage.getItem('searchedMovie');
    if (storedResults) {
      setSearchResults(JSON.parse(storedResults));
    }
  }, [location.search]);

  return (
    <div>
      <Navbar />
      {searchResults.length > 0 ? (
        <div className="results-container">
          <MovieDisplay 
            movies={searchResults}
            title="Search Results"
            size="large"
          />
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
