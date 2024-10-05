import React, { useEffect, useState } from 'react';
import MovieDisplay from '../../components/movieDisplay/MovieDisplay';

const Bookmarks: React.FC = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Fetch bookmarks from localStorage
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarkedMovies(storedBookmarks);
  }, []);

  return (
    <div>
      <h1>Your Bookmarked Movies</h1>
      {bookmarkedMovies.length > 0 ? (
        <MovieDisplay movies={bookmarkedMovies} title="Bookmarked Movies" />  
      ) : (
        <p>No movies have been bookmarked yet.</p>
      )}
    </div>
  );
};

export default Bookmarks;
