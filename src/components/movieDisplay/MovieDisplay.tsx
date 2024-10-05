/* import { MovieCard } from '../movieCard/MovieCard';
import './MovieDisplay.css';

type MovieDisplayProps = {
  movies: Movie[];
  title: string;
  size: 'small' | 'large';
};

export const MovieDisplay = ({ movies, title, size }: MovieDisplayProps) => {
  return (
    <section className="displayMovie-container">
      <h3>{title}</h3>
      <section className="displayMovie-container-movies">
        {movies.map(movie => (
          <MovieCard movie={movie} size={size} />
        ))}
      </section>
    </section>
  );
};
*/ 

import React from 'react';
import Bookmark from '../bookMark/BookMark';

type MovieDisplayProps = {
  movies: Movie[];
  title: string;
};

export const MovieDisplay: React.FC<MovieDisplayProps> = ({ movies, title }) => {
  return (
    <section className="displayMovie-container">
      <h3>{title}</h3>
      <section className="displayMovie-container-movies">
        {movies.map(movie => (
          <article key={movie.title} data-testid="movieCard">
            <h4>{movie.title}</h4>
            <img src={movie.thumbnail} alt={movie.title} />
            <Bookmark movie={movie} /> {/* Bookmark functionality */}
          </article>
        ))}
      </section>
    </section>
  );
};

export default MovieDisplay;