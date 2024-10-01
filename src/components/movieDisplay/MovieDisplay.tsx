import { Carousel } from '../carousel/Carousel';
import './MovieDisplay.css';

type Movie = {
  title: string;
  thumbnail: string;
};

type MovieDisplayProps = {
  movies: Movie[];
  title: string;
  thumbnail: string;
};

export const MovieDisplay = ({ movies, title }: MovieDisplayProps) => {
  return (
    <section className="displayMovie-container">
      <h3>{title}</h3>
      <Carousel>
        <section className="displayMovie-container-movies">
          {movies.map(movie => (
            <article
              key={movie.title}
              className="movieCard"
              data-testid="movieCard"
            >
              <img src={movie.thumbnail} alt="" />
            </article>
          ))}
        </section>
      </Carousel>
    </section>
  );
};
