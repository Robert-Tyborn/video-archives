import React, { useEffect, useState } from 'react';
import MovieDisplay from '../../components/movieDisplay/MovieDisplay';
import Navbar from '../../components/navbar/Navbar';
import './Bookmarks.css';

const Bookmarks: React.FC = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(
      localStorage.getItem('bookmarks') || '[]'
    );
    setBookmarkedMovies(storedBookmarks);
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bookmarks_main">
        <h2>Your Bookmarked Movies</h2>
        {bookmarkedMovies.length > 0 ? (
          <MovieDisplay movies={bookmarkedMovies} title="" size="small" />
        ) : (
          <p>No movies have been bookmarked yet.</p>
        )}
      </main>
    </>
  );
};

export default Bookmarks;
