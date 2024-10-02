import './MovieDisplay.css';

type MovieDisplayProps = {
  movies: Movie[];
  title: string;
};

export const MovieDisplay = ({ movies, title }: MovieDisplayProps) => {
  return (
    <section className="displayMovie-container">
      <h3>{title}</h3>
      <section className="displayMovie-container-movies">
        {movies.map(movie => (
          <article key={movie.title} data-testid="movieCard">
            <h4>{movie.title}</h4>
          </article>
        ))}
      </section>
    </section>
  );
};
