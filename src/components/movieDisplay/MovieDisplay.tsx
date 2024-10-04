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
    </section>
  );
};
