import { MovieCard } from '../movieCard/MovieCard';
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

export default MovieDisplay;


 