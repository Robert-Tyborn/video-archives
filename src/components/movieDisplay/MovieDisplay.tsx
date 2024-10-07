import { MovieCard } from '../movieCard/MovieCard';
import './MovieDisplay.css';

type Movie = {
  title: string;
  thumbnail: string;
};

type MovieDisplayProps = {
  movies: Movie[];
  title: string;
  thumbnail: string;
  size: 'small' | 'large';
};

export const MovieDisplay = ({ movies, title, size }: MovieDisplayProps) => {
  return (
    <section className="displayMovie-container">
      <h3>{title}</h3>
      <section className="displayMovie-container-movies">
        <MovieCard movies={movies} size={size} key={movies.title} />
      </section>
    </section>
  );
};
