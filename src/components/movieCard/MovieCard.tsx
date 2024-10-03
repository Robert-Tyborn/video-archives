import './MovieCard.css';

type MovieCardProps = {
  movie: Movie;
  size: 'small' | 'large';
};

export const MovieCard = ({ movie, size }: MovieCardProps) => {
  return (
    <article
      key={movie.title}
      className={`movieCard ${size}`}
      data-testid="movieCard"
    >
      <img src={movie.thumbnail} alt={movie.title} />
      <div className="movieCard-hoverContent">
        <div className="hoverContent-bookmark">Star</div>
        <p className="hoverContent-year">{`Released: ${movie.year}`}</p>
        <p className="hoverContent-rating">{`${movie.rating}`}</p>
      </div>
    </article>
  );
};
