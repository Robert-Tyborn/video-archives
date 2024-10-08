import React from 'react';
import './MovieCard.css';
import { useNavigate } from 'react-router-dom';

type MovieCardProps = {
  movie: Movie;
  size: 'small' | 'large';
};

export const MovieCard = ({ movie, size }: MovieCardProps) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  React.useEffect(() => {
    const storedBookmarks = JSON.parse(
      localStorage.getItem('bookmarks') || '[]'
    );
    const isMovieBookmarked = storedBookmarks.some(
      (bookmark: Movie) => bookmark.title === movie.title
    );
    setIsBookmarked(isMovieBookmarked);
  }, [movie.title]);

  const toggleBookmark = () => {
    const storedBookmarks = JSON.parse(
      localStorage.getItem('bookmarks') || '[]'
    );
    if (isBookmarked) {
      const updatedBookmarks = storedBookmarks.filter(
        (bookmark: Movie) => bookmark.title !== movie.title
      );
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } else {
      localStorage.setItem(
        'bookmarks',
        JSON.stringify([...storedBookmarks, movie])
      );
    }
    setIsBookmarked(!isBookmarked);
    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate(`/video-archives/filmview/${movie.title}`, { state: movie });
    };

    return (
      <article
        key={movie.title}
        className={`movieCard ${size}`}
        data-testid="movieCard"
        onClick={handleCardClick}
      >
        <img src={movie.thumbnail} alt={movie.title} />
        <div className="movieCard-hoverContent">
          <div className="hoverContent-bookmark" onClick={toggleBookmark}>
            <span className={isBookmarked ? 'star bookmarked' : 'star'}>
              {isBookmarked ? '★' : '☆'}
            </span>
          </div>

          <p className="hoverContent-year">{`Released: ${movie.year}`}</p>
          <p className="hoverContent-rating">{`${movie.rating}`}</p>
        </div>
      </article>
    );
  };
};
export default MovieCard;
