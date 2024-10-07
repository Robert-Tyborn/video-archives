import React, { useEffect, useState } from 'react';
import MovieDisplay from '../../components/movieDisplay/MovieDisplay';
import Navbar from '../../components/navbar/Navbar';


const Bookmarks: React.FC = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarkedMovies(storedBookmarks);
  }, []);

  return (
    <div>
        <header>
        <Navbar />
      </header>
      <h1>Your Bookmarked Movies</h1>
      {bookmarkedMovies.length > 0 ? (
        <MovieDisplay movies={bookmarkedMovies} title="Bookmarked Movies" size="small" />
        ) : (
        <p>No movies have been bookmarked yet.</p>
      )}
    </div>
  );
};

export default Bookmarks;
