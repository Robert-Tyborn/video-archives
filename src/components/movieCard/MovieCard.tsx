import { useNavigate } from 'react-router-dom';
import './MovieCard.css';
import Bookmark from '../bookMark/BookMark';
import noImage from '../../assets/NoImageSmall.jpg';
import { useState } from 'react';

type MovieCardProps = {
  movie: Movie;
  size: 'small' | 'large';
};

export const MovieCard = ({ movie, size }: MovieCardProps) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState<boolean>(false);

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
      {imgError ? (
        <div className="movieCard_imgError">
          <p className="imgError-title">{movie.title}</p>
          <img src={noImage} alt={movie.title} className="imgError-image" />
        </div>
      ) : (
        <img
          src={movie.thumbnail}
          alt={movie.title}
          onError={() => setImgError(true)}
        />
      )}
      <div className="movieCard-hoverContent">
        <div className="hoverContent-bookmark">
          <Bookmark movie={movie} />
        </div>
        <p className="hoverContent-year">{`Released: ${movie.year}`}</p>
        <p className="hoverContent-rating">{movie.rating}</p>
      </div>
    </article>
  );
};

export default MovieCard;
