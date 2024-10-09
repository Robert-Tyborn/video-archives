import { MovieCard } from '../movieCard/MovieCard';
import './MovieDisplay.css';

type Movie = {
  title: string;
  thumbnail: string;
  year: number;
  rating: string;
  actors: string[];
  genre: string;
  synopsis: string;
};

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
          <MovieCard key={movie.title} movie={movie} size={size} />
        ))}
      </section>
    </section>
  );
};

export default MovieDisplay;
